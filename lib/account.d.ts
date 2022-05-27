import { Contract } from './contract';
import { ResultOfProcessMessage, TonClient } from '@tonclient/core';
import { KeyPair } from '@tonclient/core/dist/modules';
import { BigNumber } from 'bignumber.js';
export declare class Account extends Contract {
    client: TonClient;
    keyPair?: KeyPair;
    runTarget({ contract, method, params, value, keyPair }: {
        contract: Contract;
        method: string;
        params?: Record<string, any>;
        value: BigNumber;
        keyPair: KeyPair;
    }): Promise<ResultOfProcessMessage>;
}
