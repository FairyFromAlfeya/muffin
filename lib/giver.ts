import { Contract } from './contract';
import { convertCrystal, getRandomNonce, nodeUrl, giver } from './utils';
import { AbiContract, ResultOfEncodeMessage, ResultOfProcessMessage, TonClient } from '@tonclient/core';
import { KeyPair, ParamsOfEncodeMessage } from '@tonclient/core/dist/modules';

export class Giver {
  client = new TonClient({ network: { server_address: nodeUrl() } });
  giver = new Contract({
    ...giver(),
    name: 'Giver',
  });

  async deployContract({
    contract,
    constructorParams,
    initParams,
    keyPair
  }: {
    contract: Contract;
    constructorParams: Record<string, any>;
    initParams: Record<string, any>;
    keyPair: KeyPair
  },
    amount = convertCrystal(10, 'nano'),
  ): Promise<Contract> {
    // Extend init params with random _randomNonce if it's found in ABI and autoRandomNonce is enabled
    const extendedInitParams = initParams || {};

    if (contract.autoRandomNonce) {
      if (contract.abi.data.find((e: { name: string }) => e.name === '_randomNonce')) {
        extendedInitParams._randomNonce = extendedInitParams._randomNonce || getRandomNonce();
      }
    }

    const { address } = await this.createDeployMessage({
      contract,
      constructorParams,
      initParams: extendedInitParams,
      keyPair,
    });

    await this.giver?.run({
      method: 'sendGrams',
      params: { dest: address, amount },
    });

    // Wait for receiving grams
    await this.client.net.wait_for_collection({
      collection: 'accounts',
      filter: { id: { eq: address }, balance: { gt: `0x0` } },
      result: 'balance',
    });

    // Send deploy transaction
    const message = await this.createDeployMessage({
      contract,
      constructorParams,
      initParams: extendedInitParams,
      keyPair,
    });

    await this.waitForRunTransaction({
      message,
      abi: contract.abi,
    });

    contract.setAddress(address);

    return contract;
  }

  async waitForRunTransaction({
    message,
    abi
  }: {
    message: { message: string };
    abi: AbiContract;
  }): Promise<ResultOfProcessMessage> {
    const { shard_block_id } =
      await this.client.processing.send_message({
        message: message.message,
        send_events: false,
      });

    return this.client.processing.wait_for_transaction({
      message: message.message,
      shard_block_id,
      send_events: false,
      abi: { type: 'Contract', value: abi },
    });
  }

  async createDeployMessage({
    contract,
    constructorParams,
    initParams,
    keyPair,
  }: {
    contract: Contract;
    constructorParams: Record<string, any>;
    initParams: Record<string, any>;
    keyPair: KeyPair;
  }): Promise<ResultOfEncodeMessage> {
    const encodeParams: ParamsOfEncodeMessage = {
      abi: { type: 'Contract', value: contract.abi },
      deploy_set: { tvc: contract.base64, initial_data: initParams },
      call_set: { function_name: 'constructor', input: constructorParams || {} },
      signer: { type: 'None' },
    };

    return this.client.abi.encode_message(
      this.enrichMessageWithKeys(encodeParams, keyPair),
    );
  }

  enrichMessageWithKeys(
    encodeParams: ParamsOfEncodeMessage,
    keyPair?: KeyPair
  ): ParamsOfEncodeMessage {
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
