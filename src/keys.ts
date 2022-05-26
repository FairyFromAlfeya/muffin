import { TonClient } from '@tonclient/core';

class Keys {
  keyPairs: any[] = [];
  client = new TonClient({ network: { server_address: 'http://localhost:80/' } });

  async getKeyPairs() {
    return this.keyPairs;
  }

  async setup() {
    const keysHDPaths = [...Array(20).keys()]
      .map((i) => 'm/44\'/396\'/0\'/0/INDEX'.replace('INDEX', i.toString()));

    if (process.platform !== 'darwin') {
      this.keyPairs = await Promise.all(
        keysHDPaths.map(async (path) => {
          return this.client.crypto.mnemonic_derive_sign_keys({
            dictionary: 1,
            word_count: 12,
            phrase: 'illegal object novel cattle drink replace oblige online curtain radio blossom legend',
            path,
          });
        }),
      );
    } else {
      for (const path of keysHDPaths) {
        this.keyPairs.push(
          await this.client.crypto.mnemonic_derive_sign_keys({
            dictionary: 1,
            word_count: 12,
            phrase: 'illegal object novel cattle drink replace oblige online curtain radio blossom legend',
            path,
          }),
        );
      }
    }
  }
}

export const keys = new Keys();
