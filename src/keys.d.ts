import { TonClient } from '@tonclient/core';
declare class Keys {
    keyPairs: any[];
    client: TonClient;
    getKeyPairs(): Promise<any[]>;
    setup(): Promise<void>;
}
export declare const keys: Keys;
export {};
