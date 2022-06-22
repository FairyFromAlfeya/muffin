import { TonClient } from '@tonclient/core';
import { KeyPair } from '@tonclient/core/dist/modules';
import { nodeUrl, keys as keysCfg } from './utils';

class Keys {
  keyPairs: KeyPair[] = [];
  client = new TonClient({ network: { server_address: nodeUrl() } });

  async getKeyPairs(): Promise<KeyPair[]> {
    if (this.keyPairs.length === 0) {
      await this.setup();
    }

    return this.keyPairs;
  }

  async setup(): Promise<void> {
    const key = keysCfg();
    const keysHDPaths = [...Array(key.amount).keys()]
      .map((i) => 'm/44\'/396\'/0\'/0/INDEX'.replace('INDEX', i.toString()));

    if (process.platform !== 'darwin') {
      this.keyPairs = await Promise.all(
        keysHDPaths.map(async (path) => {
          return this.client.crypto.mnemonic_derive_sign_keys({
            dictionary: 1,
            word_count: 12,
            phrase: key.phrase,
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
            phrase: key.phrase,
            path,
          }),
        );
      }
    }
  }
}

export const keys = new Keys();
