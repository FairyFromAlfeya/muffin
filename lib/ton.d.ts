import { TonClient } from '@tonclient/core';
import { BigNumber } from 'bignumber.js';
declare class Ton {
    client: TonClient;
    getBalance(address: string): Promise<BigNumber>;
}
export declare const ton: Ton;
export {};
