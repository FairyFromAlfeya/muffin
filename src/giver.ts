import { Contract } from './contract';
import { convertCrystal, getRandomNonce } from './utils';
import { TonClient } from '@tonclient/core';

/**
 * Locklift plugin for working with classic givers.
 * Supports giver from local-node and any compatible one
 */
export class Giver {
  client = new TonClient({ network: { server_address: 'http://localhost:80/' } });
  giver = new Contract({
    abi: {
      "ABI version": 1,
      "functions": [
        { "name": "constructor", "inputs": [], "outputs": [] },
        { "name": "sendGrams", "inputs": [ {"name":"dest","type":"address"}, {"name":"amount","type":"uint64"} ], "outputs": [] }
      ],
      "events": [],
      "data": []
    },
    address: '0:841288ed3b55d9cdafa806807f02a0ae0c169aa5edfe88a789a6482429756a94',
    name: 'Giver',
  });

  /**
   * Deploys contract by using giver.
   * 1. Derives contract address
   * 2. Sends specified amount of TONs to address
   * 3. Waits for balance to be replenished
   * 4. Deploys contract and setup address
   * @param contract Contract instance to deploy
   * @param constructorParams Constructor parameters data
   * @param initParams Initial data
   * @param keyPair Key pair to use
   * @param [amount=locklift.utils.convertCrystal(10, 'nano')] Amount in nano TONs to request from giver
   * @returns {Promise<*>}
   */
  async deployContract(
    { contract, constructorParams, initParams, keyPair }: { contract: any; constructorParams: any; initParams: any; keyPair: any },
    amount = convertCrystal(10, 'nano'),
  ) {
    // Extend init params with random _randomNonce if it's found in ABI and autoRandomNonce is enabled
    const extendedInitParams = initParams === undefined ? {} : initParams;

    if (contract.autoRandomNonce) {
      if (contract.abi.data.find((e: { name: string }) => e.name === '_randomNonce')) {
        extendedInitParams._randomNonce =
          extendedInitParams._randomNonce === undefined
            ? getRandomNonce()
            : extendedInitParams._randomNonce;
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
      params: {
        dest: address,
        amount,
      },
    });

    // Wait for receiving grams
    await this.client.net.wait_for_collection({
      collection: 'accounts',
      filter: {
        id: { eq: address },
        balance: { gt: `0x0` },
      },
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

  async createDeployMessage({
    contract,
    constructorParams,
    initParams,
    keyPair,
  }: {
    contract: any;
    constructorParams: any;
    initParams: any;
    keyPair: any;
  }) {
    const encodeParams = {
      abi: {
        type: 'Contract',
        value: contract.abi,
      },
      deploy_set: {
        tvc: contract.base64,
        initial_data: initParams,
      },
      call_set: {
        function_name: 'constructor',
        input: constructorParams === undefined ? {} : constructorParams,
      },
      signer: {
        type: 'None',
      },
    };

    return this.client.abi.encode_message(
      this.enrichMessageWithKeys(encodeParams, keyPair),
    );
  }

  enrichMessageWithKeys(encodeParams: any, keyPair: any) {
    return keyPair === undefined
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
