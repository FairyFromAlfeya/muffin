import { TonClient } from '@tonclient/core';
import { ParamsOfEncodeMessage } from '@tonclient/core/dist/modules';
export declare class Contract {
    client: TonClient;
    abi: any;
    base64: any;
    code: any;
    name: string;
    address?: string;
    keyPair: any;
    afterRun: any;
    autoAnswerIdOnCall: boolean;
    autoRandomNonce: boolean;
    constructor({ abi, base64, code, name, address, keyPair, autoAnswerIdOnCall, autoRandomNonce, afterRun, }: {
        abi: any;
        base64?: any;
        code?: any;
        name: any;
        address?: string;
        keyPair?: any;
        autoAnswerIdOnCall?: any;
        autoRandomNonce?: boolean;
        afterRun?: any;
    });
    /**
     * Set contract address
     * @param address
     */
    setAddress(address: string): void;
    /**
     * Set key pair to use for interacting with contract.
     * @param keyPair
     */
    setKeyPair(keyPair: any): void;
    run({ method, params, keyPair, }: {
        method: any;
        params: any;
        keyPair?: any;
    }): Promise<import("@tonclient/core").ResultOfProcessMessage>;
    waitForRunTransaction({ message, abi }: {
        message: any;
        abi: any;
    }): Promise<import("@tonclient/core").ResultOfProcessMessage>;
    call({ method, params, keyPair }: {
        method: string;
        params: any;
        keyPair: any;
    }): Promise<any>;
    decodeMessages(messages: any[], is_internal: boolean): Promise<{
        messageId: any;
        src: any;
        created_at: any;
        body_type: import("@tonclient/core").MessageBodyType;
        name: string;
        value?: any;
        header?: import("@tonclient/core").FunctionHeader | undefined;
    }[]>;
    getSentMessages(messageType: any, internal: boolean): Promise<{
        messageId: any;
        src: any;
        created_at: any;
        body_type: import("@tonclient/core").MessageBodyType;
        name: string;
        value?: any;
        header?: import("@tonclient/core").FunctionHeader | undefined;
    }[]>;
    getEvents(eventName: string): Promise<{
        messageId: any;
        src: any;
        created_at: any;
        body_type: import("@tonclient/core").MessageBodyType;
        name: string;
        value?: any;
        header?: import("@tonclient/core").FunctionHeader | undefined;
    }[]>;
    createRunMessage({ contract, method, params, keyPair }: {
        contract: any;
        method: string;
        params: any;
        keyPair: any;
    }): Promise<import("@tonclient/core").ResultOfEncodeMessage>;
    enrichMessageWithKeys(encodeParams: any, keyPair: any): ParamsOfEncodeMessage;
}
