import { OutputDecoder } from './output-decoder';
import {
  AbiContract,
  DecodedMessageBody,
  ResultOfEncodeMessage,
  ResultOfProcessMessage,
  TonClient,
} from '@tonclient/core';
import { ParamsOfEncodeMessage, KeyPair } from '@tonclient/core/dist/modules';
import { BigNumber } from 'bignumber.js';
import { nodeUrl } from './utils';

export class Contract {
  client = new TonClient({ network: { server_address: nodeUrl() } });

  abi: Record<string, any>;
  base64: string;
  code?: string;
  name: string;
  address?: string;
  keyPair?: KeyPair;
  afterRun: (tx: ResultOfProcessMessage) => Promise<any>;
  autoAnswerIdOnCall: boolean;
  autoRandomNonce: boolean;

  constructor({
    abi,
    base64,
    code,
    name,
    address,
    keyPair,
    autoAnswerIdOnCall,
    autoRandomNonce,
    afterRun,
  }: {
    abi: Record<string, any>;
    base64?: string;
    code?: string;
    name: string;
    address?: string;
    keyPair?: KeyPair;
    autoAnswerIdOnCall?: boolean;
    autoRandomNonce?: boolean;
    afterRun?: (tx: ResultOfProcessMessage) => Promise<any>;
  }) {
    this.abi = abi;
    this.base64 = base64 || '';
    this.code = code;
    this.name = name;
    this.address = address;
    this.keyPair = keyPair;
    this.afterRun = afterRun === undefined ? async () => ({ success: true }) : afterRun;

    this.autoAnswerIdOnCall = autoAnswerIdOnCall || true;
    this.autoRandomNonce = autoRandomNonce || true;
  }

  setAddress(address: string) {
    this.address = address;
  }

  setKeyPair(keyPair: KeyPair) {
    this.keyPair = keyPair;
  }

  async run({
    method,
    params,
    keyPair,
  }: {
    method: string;
    params: Record<string, any>;
    keyPair?: KeyPair;
  }): Promise<ResultOfProcessMessage> {
    const message = await this.createRunMessage({
      contract: this,
      method,
      params: params || {},
      keyPair: keyPair || this.keyPair,
    });

    const tx = await this.waitForRunTransaction({
      message,
      abi: this.abi,
    });

    await this.afterRun(tx);

    return tx;
  }

  async waitForRunTransaction({ message, abi }: { message: { message: string }; abi: AbiContract }): Promise<ResultOfProcessMessage> {
    const { shard_block_id } =
      await this.client.processing.send_message({
        message: message.message,
        send_events: false,
      });

    return this.client.processing.wait_for_transaction({
      message: message.message,
      shard_block_id,
      send_events: false,
      abi: {
        type: 'Contract',
        value: abi,
      },
    });
  }

  async call(
    method: string,
    params?: Record<string, any>,
    keyPair?: KeyPair
  ): Promise<Record<string, any> | string | BigNumber> {
    const extendedParams = params || {};

    if (this.autoAnswerIdOnCall) {
      if (
        this.abi.functions
          .find((e: { name: string }) => e.name === method)
          .inputs.find((e: { name: string }) => e.name === '_answer_id')
      ) {
        extendedParams._answer_id = extendedParams._answer_id || 1;
      } else if (
        this.abi.functions
          .find((e: { name: string }) => e.name === method)
          .inputs.find((e: { name: string }) => e.name === 'answerId')
      ) {
        extendedParams.answerId = extendedParams.answerId || 1;
      }
    }

    const { message } = await this.createRunMessage({
      contract: this,
      method,
      params: extendedParams,
      keyPair: keyPair || this.keyPair,
    });

    const { result: [{ boc }] } = await this.client.net.query_collection({
      collection: 'accounts',
      filter: { id: { eq: this.address } },
      result: 'boc',
    });

    const { decoded } = await this.client.tvm.run_tvm({
      abi: {
        type: 'Contract',
        value: this.abi,
      },
      message,
      account: boc,
    });

    const functionAttributes = this.abi.functions.find(
      ({ name }: { name: string }) => name === method,
    );

    const outputDecoder = new OutputDecoder(decoded?.output, functionAttributes);

    return outputDecoder.decode();
  }

  async decodeMessages(
    messages: { body: string, id: string, src: string, created_at: number }[],
    is_internal: boolean
  ): Promise<DecodedMessageBody[]> {
    const decodedMessages = messages.map(async (message) => {
      const decodedMessage = await this.client.abi.decode_message_body({
        abi: {
          type: 'Contract',
          value: this.abi,
        },
        body: message.body,
        is_internal,
      });

      return {
        ...decodedMessage,
        messageId: message.id,
        src: message.src,
        created_at: message.created_at,
      };
    });

    return Promise.all(decodedMessages);
  }

  async getSentMessages(messageType: number, internal: boolean): Promise<DecodedMessageBody[]> {
    const { result } = await this.client.net.query_collection({
      collection: 'messages',
      filter: {
        src: {
          eq: this.address,
        },
        msg_type: {
          eq: messageType,
        },
      },
      result: 'body id src created_at',
    });

    return this.decodeMessages(result, internal);
  }

  async getEvents(eventName: string): Promise<DecodedMessageBody[]> {
    const sentMessages = await this.getSentMessages(2, false);

    return sentMessages.filter((message) => message.name === eventName);
  }

  async createRunMessage({
    contract,
    method,
    params,
    keyPair
  }: {
    contract: Contract;
    method: string;
    params: Record<string, any>;
    keyPair?: KeyPair
  }): Promise<ResultOfEncodeMessage> {
    const encodeParams: ParamsOfEncodeMessage = {
      address: contract.address,
      abi: {
        type: 'Contract',
        value: contract.abi,
      },
      call_set: {
        function_name: method,
        input: params,
      },
      signer: {
        type: 'None',
      },
    };

    return this.client.abi.encode_message(this.enrichMessageWithKeys(encodeParams, keyPair));
  }

  enrichMessageWithKeys(encodeParams: ParamsOfEncodeMessage, keyPair?: KeyPair): ParamsOfEncodeMessage {
    return !keyPair
      ? encodeParams
      : {
        ...encodeParams,
        signer: {
          type: 'Keys',
          keys: keyPair,
        },
      };
  }
}
