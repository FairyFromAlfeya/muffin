import { TonClient } from '@tonclient/core';
import { KeyPair } from '@tonclient/core/dist/modules';
declare class Keys {
    keyPairs: KeyPair[];
    client: TonClient;
    getKeyPairs(): Promise<KeyPair[]>;
    setup(): Promise<void>;
}
export declare const keys: Keys;
export {};
