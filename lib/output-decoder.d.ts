/// <reference types="node" />
import { BigNumber } from 'bignumber.js';
interface Schema {
    name: string;
    type: string;
    components: Schema[];
}
interface FunctionAttributes {
    name: string;
    inputs: Schema[];
    outputs: Schema[];
}
export declare class OutputDecoder {
    output: Record<string, any>;
    functionAttributes: FunctionAttributes;
    constructor(output: Record<string, any>, functionAttributes: FunctionAttributes);
    decode_value(encoded_value: string & string[] & BigNumber.Value, schema: Schema): boolean | Record<string, any>;
    decodeBytes(value: string): Buffer;
    decodeBytesArray(value: string[]): Buffer[];
    decodeBool(value: any): boolean;
    decodeInt(value: BigNumber.Value): BigNumber;
    decodeIntArray(value: BigNumber.Value[]): BigNumber[];
    decode(): Record<string, any>;
    decodeTuple(value: Record<string, any>, schema: Schema[]): Record<string, any>;
}
export {};
