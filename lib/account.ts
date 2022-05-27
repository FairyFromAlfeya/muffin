import { Contract } from './contract';
import { convertCrystal } from './utils';
import { ResultOfProcessMessage, TonClient } from '@tonclient/core';
import { KeyPair } from '@tonclient/core/dist/modules';
import { BigNumber } from 'bignumber.js';

export class Account extends Contract {
  client = new TonClient({ network: { server_address: 'http://localhost:80/' } });
  keyPair?: KeyPair;

  async runTarget({
    contract,
    method,
    params,
    value,
    keyPair
  }: {
    contract: Contract;
    method: string;
    params?: Record<string, any>;
    value: BigNumber;
    keyPair: KeyPair
  }): Promise<ResultOfProcessMessage> {
    let body = '';

    if (method) {
      const extendedParams = params || {};

      if (this.autoAnswerIdOnCall) {
        if (
          contract.abi.functions
            .find((e: { name: string }) => e.name === method)
            .inputs.find((e: { name: string }) => e.name === '_answer_id')
        ) {
          extendedParams._answer_id = extendedParams._answer_id || 1;
        } else if (
          contract.abi.functions
            .find((e: { name: string }) => e.name === method)
            .inputs.find((e: { name: string }) => e.name === 'answerId')
        ) {
          extendedParams.answerId = extendedParams.answerId || 1;
        }
      }

      const message = await this.client.abi.encode_message_body({
        abi: {
          type: 'Contract',
          value: contract.abi,
        },
        call_set: {
          function_name: method,
          input: extendedParams,
        },
        signer: {
          type: 'None',
        },
        is_internal: true,
      });

      body = message.body;
    }

    return this.run({
      method: 'sendTransaction',
      params: {
        dest: contract.address,
        value:
          value === undefined
            ? convertCrystal('2', 'nano')
            : value,
        bounce: true,
        flags: 0,
        payload: body,
      },
      keyPair: keyPair === undefined ? this.keyPair : keyPair,
    });
  }
}
