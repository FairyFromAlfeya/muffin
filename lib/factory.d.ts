import { Contract } from './contract';
import { Account } from './account';
import { TonClient } from '@tonclient/core';
declare class Factory {
    client: TonClient;
    initializeContract(name: string, resolvedPath: string): Promise<Contract>;
    getContract(name: string, build?: string): Promise<Contract>;
    getAccount(name?: string, build?: string): Promise<Account>;
}
export declare const factory: Factory;
export {};
