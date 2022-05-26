import { OutputDecoder } from './output-decoder';
import { TonClient } from '@tonclient/core';
import { ParamsOfEncodeMessage } from '@tonclient/core/dist/modules';

export class Contract {
  client = new TonClient({ network: { server_address: 'http://localhost:80/' } });
  abi: any;
  base64: any;
  code: any;
  name: string;
  address?: string;
  keyPair: any;
  afterRun: any;
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
    abi: any;
    base64?: any;
    code?: any;
    name: any;
    address?: string;
    keyPair?: any;
    autoAnswerIdOnCall?: any;
    autoRandomNonce?: boolean;
    afterRun?: any;
  }) {
    this.abi = abi;
    this.base64 = base64;
    this.code = code;
    this.name = name;
    this.address = address;
    this.keyPair = keyPair;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this.afterRun = afterRun === undefined ? async () => {} : afterRun;

    this.autoAnswerIdOnCall =
      autoAnswerIdOnCall === undefined ? true : autoAnswerIdOnCall;
    this.autoRandomNonce =
      autoRandomNonce === undefined ? true : autoRandomNonce;
  }

  /**
   * Set contract address
   * @param address
   */
  setAddress(address: string) {
    this.address = address;
  }

  /**
   * Set key pair to use for interacting with contract.
   * @param keyPair
   */
  setKeyPair(keyPair: any) {
    this.keyPair = keyPair;
  }

  async run({
    method,
    params,
    keyPair,
  }: {
    method: any;
    params: any;
    keyPair?: any;
  }) {
    const message = await this.createRunMessage({
      contract: this,
      method,
      params: params === undefined ? {} : params,
      keyPair: keyPair === undefined ? this.keyPair : keyPair,
    });

    const tx = this.waitForRunTransaction({
      message,
      abi: this.abi,
    });

    await this.afterRun(tx);

    return tx;
  }

  async waitForRunTransaction({ message, abi }: { message: any; abi: any }) {
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

  async call({ method, params, keyPair }: { method: string; params: any; keyPair: any }) {
    const extendedParams = params === undefined ? {} : params;

    if (this.autoAnswerIdOnCall) {
      if (
        this.abi.functions
          .find((e: { name: string }) => e.name === method)
          .inputs.find((e: { name: string }) => e.name === '_answer_id')
      ) {
        extendedParams._answer_id =
          extendedParams._answer_id === undefined
            ? 1
            : extendedParams._answer_id;
      } else if (
        this.abi.functions
          .find((e: { name: string }) => e.name === method)
          .inputs.find((e: { name: string }) => e.name === 'answerId')
      ) {
        extendedParams.answerId =
          extendedParams.answerId === undefined ? 1 : extendedParams.answerId;
      }
    }

    const { message } = await this.createRunMessage({
      contract: this,
      method,
      params: extendedParams,
      keyPair: keyPair === undefined ? this.keyPair : keyPair,
    });

    const {
      result: [{ boc }],
    } = await this.client.net.query_collection({
      collection: 'accounts',
      filter: {
        id: {
          eq: this.address,
        },
      },
      result: 'boc',
    });

    // Get output of the method run execution
    const {
      decoded,
    } = await this.client.tvm.run_tvm({
      abi: {
        type: 'Contract',
        value: this.abi,
      },
      message: message,
      account: boc,
    });

    // Decode output
    const functionAttributes = this.abi.functions.find(
      ({ name }: { name: string }) => name === method,
    );

    const outputDecoder = new OutputDecoder(decoded?.output, functionAttributes);

    return outputDecoder.decode();
  }

  async decodeMessages(messages: any[], is_internal: boolean) {
    const decodedMessages = messages.map(async (message: any) => {
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

  async getSentMessages(messageType: any, internal: boolean) {
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

  async getEvents(eventName: string) {
    const sentMessages = await this.getSentMessages(2, false);

    return sentMessages.filter((message) => message.name === eventName);
  }

  async createRunMessage({ contract, method, params, keyPair }: { contract: any; method: string; params: any; keyPair: any }) {
    const encodeParams = {
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

    return this.client.abi.encode_message(
      this.enrichMessageWithKeys(encodeParams, keyPair),
    );
  }

  enrichMessageWithKeys(encodeParams: any, keyPair: any): ParamsOfEncodeMessage {
    return keyPair === undefined
      ? encodeParams
      : {
        ...encodeParams,
        signer: {
          type: 'Keys',
          keys: keyPair,
        },
      } as any;
  }
}
