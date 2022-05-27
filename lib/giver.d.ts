import { Contract } from './contract';
import { AbiContract, ResultOfEncodeMessage, ResultOfProcessMessage, TonClient } from '@tonclient/core';
import { KeyPair, ParamsOfEncodeMessage } from '@tonclient/core/dist/modules';
export declare class Giver {
    client: TonClient;
    giver: Contract;
    deployContract({ contract, constructorParams, initParams, keyPair }: {
        contract: Contract;
        constructorParams: Record<string, any>;
        initParams: Record<string, any>;
        keyPair: KeyPair;
    }, amount?: import("bignumber.js").default): Promise<Contract>;
    waitForRunTransaction({ message, abi }: {
        message: {
            message: string;
        };
        abi: AbiContract;
    }): Promise<ResultOfProcessMessage>;
    createDeployMessage({ contract, constructorParams, initParams, keyPair, }: {
        contract: Contract;
        constructorParams: Record<string, any>;
        initParams: Record<string, any>;
        keyPair: KeyPair;
    }): Promise<ResultOfEncodeMessage>;
    enrichMessageWithKeys(encodeParams: ParamsOfEncodeMessage, keyPair?: KeyPair): ParamsOfEncodeMessage;
}
