import { AbiContract, DecodedMessageBody, ResultOfEncodeMessage, ResultOfProcessMessage, TonClient } from '@tonclient/core';
import { ParamsOfEncodeMessage, KeyPair } from '@tonclient/core/dist/modules';
export declare class Contract {
    client: TonClient;
    abi: Record<string, any>;
    base64: string;
    code?: string;
    name: string;
    address?: string;
    keyPair?: KeyPair;
    afterRun: (tx: ResultOfProcessMessage) => Promise<any>;
    autoAnswerIdOnCall: boolean;
    autoRandomNonce: boolean;
    constructor({ abi, base64, code, name, address, keyPair, autoAnswerIdOnCall, autoRandomNonce, afterRun, }: {
        abi: Record<string, any>;
        base64?: string;
        code?: string;
        name: string;
        address?: string;
        keyPair?: KeyPair;
        autoAnswerIdOnCall?: boolean;
        autoRandomNonce?: boolean;
        afterRun?: (tx: ResultOfProcessMessage) => Promise<any>;
    });
    setAddress(address: string): void;
    setKeyPair(keyPair: KeyPair): void;
    run({ method, params, keyPair, }: {
        method: string;
        params: Record<string, any>;
        keyPair?: KeyPair;
    }): Promise<ResultOfProcessMessage>;
    waitForRunTransaction({ message, abi }: {
        message: {
            message: string;
        };
        abi: AbiContract;
    }): Promise<ResultOfProcessMessage>;
    call(method: string, params?: Record<string, any>, keyPair?: KeyPair): Promise<Record<string, any>>;
    decodeMessages(messages: {
        body: string;
        id: string;
        src: string;
        created_at: number;
    }[], is_internal: boolean): Promise<DecodedMessageBody[]>;
    getSentMessages(messageType: number, internal: boolean): Promise<DecodedMessageBody[]>;
    getEvents(eventName: string): Promise<DecodedMessageBody[]>;
    createRunMessage({ contract, method, params, keyPair }: {
        contract: Contract;
        method: string;
        params: Record<string, any>;
        keyPair?: KeyPair;
    }): Promise<ResultOfEncodeMessage>;
    enrichMessageWithKeys(encodeParams: ParamsOfEncodeMessage, keyPair?: KeyPair): ParamsOfEncodeMessage;
}
