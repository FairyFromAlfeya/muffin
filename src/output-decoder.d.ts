/// <reference types="node" />
import { BigNumber } from 'bignumber.js';
export declare class OutputDecoder {
    output: any;
    functionAttributes: any;
    constructor(output: any, functionAttributes: any);
    decode_value(encoded_value: any, schema: any): any;
    decodeBytes(value: string): Buffer;
    decodeBytesArray(value: string[]): Buffer[];
    decodeBool(value: any): boolean;
    decodeInt(value: BigNumber.Value): BigNumber;
    decodeIntArray(value: BigNumber.Value[]): BigNumber[];
    decode(): any;
    decodeTuple(value: any, schema: any): Record<string, any>;
}
