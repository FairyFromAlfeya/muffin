import { readFileSync } from 'fs';
import { BigNumber } from 'bignumber.js';

export const loadJSONFromFile = (filePath: string) => {
  return JSON.parse(readFileSync(filePath, 'utf8'));
};

export const loadBase64FromFile = (filePath: string) => {
  return readFileSync(filePath, 'utf8').split('\n').join('');
};

export const convertCrystal = (amount: BigNumber.Value, dimension: 'nano' | 'ton') => {
  const crystalBN = new BigNumber(amount);

  if (dimension === 'nano') {
    return crystalBN.times(10 ** 9).toFixed(0);
  } else {
    return crystalBN.div(new BigNumber(10).pow(9));
  }
};

export const getRandomNonce = () => (Math.random() * 64000) | 0;

export const zeroAddress =
  '0:0000000000000000000000000000000000000000000000000000000000000000';
