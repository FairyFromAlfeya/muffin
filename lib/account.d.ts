import { Contract } from './contract';
import { TonClient } from '@tonclient/core';
/**
 * Account contract wrapping. Extending Contract object. Implements method
 * for internal calling other contracts by calling sendTransaction method.
 */
export declare class Account extends Contract {
    client: TonClient;
    keyPair: any;
    /**
     * Run another contracts' method as internal message
     * If method and params not specified - sends value without payload.
     * You may use Account contract of create your own contract with same sendTransaction signature
     * @param contract Contract instance
     * @param method Contract's method name
     * @param params Contract's method params
     * @param [value=this.locklift.utils.convertCrystal('2', 'nano')] Value to attach in nano TONs
     * @param [keyPair=this.keyPair] Key pair to use
     * @returns {Promise<*>}
     */
    runTarget({ contract, method, params, value, keyPair }: {
        contract: any;
        method: string;
        params: any;
        value: any;
        keyPair: any;
    }): Promise<import("@tonclient/core").ResultOfProcessMessage>;
}
