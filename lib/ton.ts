import { nodeUrl } from './utils';
import { TonClient } from '@tonclient/core';
import { BigNumber } from 'bignumber.js';

class Ton {
  client = new TonClient({ network: { server_address: nodeUrl() } });

  getBalance(address: string): Promise<BigNumber> {
    return this.client.net
      .query_collection({
        collection: 'accounts',
        filter: { id: { eq: address } },
        result: 'balance',
      })
      .then((response) => new BigNumber(response.result[0].balance));
  }
}

export const ton = new Ton();
