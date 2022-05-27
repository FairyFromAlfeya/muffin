import { BigNumber } from 'bignumber.js';
export declare const loadJSONFromFile: (filePath: string) => any;
export declare const loadBase64FromFile: (filePath: string) => string;
export declare const convertCrystal: (amount: BigNumber.Value, dimension: 'nano' | 'ton') => BigNumber;
export declare const getRandomNonce: () => number;
export declare const ZERO_ADDRESS = "0:0000000000000000000000000000000000000000000000000000000000000000";
