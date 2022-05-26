import { Contract } from './contract';
import { TonClient } from '@tonclient/core';
/**
 * Locklift plugin for working with classic givers.
 * Supports giver from local-node and any compatible one
 */
export declare class Giver {
    client: TonClient;
    giver: Contract;
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
    deployContract({ contract, constructorParams, initParams, keyPair }: {
        contract: any;
        constructorParams: any;
        initParams: any;
        keyPair: any;
    }, amount?: string | import("bignumber.js").default): Promise<any>;
    waitForRunTransaction({ message, abi }: {
        message: any;
        abi: any;
    }): Promise<import("@tonclient/core").ResultOfProcessMessage>;
    createDeployMessage({ contract, constructorParams, initParams, keyPair, }: {
        contract: any;
        constructorParams: any;
        initParams: any;
        keyPair: any;
    }): Promise<import("@tonclient/core").ResultOfEncodeMessage>;
    enrichMessageWithKeys(encodeParams: any, keyPair: any): any;
}
