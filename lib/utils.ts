import { readFileSync } from 'fs';
import { BigNumber } from 'bignumber.js';
import { join } from 'path';
import { GiverOptions, KeysOptions } from '../cli/lib/configuration';

export const loadJSONFromFile = (filePath: string): any => {
  return JSON.parse(readFileSync(filePath, 'utf8'));
};

export const loadBase64FromFile = (filePath: string): string => {
  return readFileSync(filePath, 'utf8').split('\n').join('');
};

export const convertCrystal = (amount: BigNumber.Value, dimension: 'nano' | 'ton'): BigNumber => {
  const crystalBN = new BigNumber(amount);

  if (dimension === 'nano') {
    return crystalBN.times(10 ** 9);
  } else {
    return crystalBN.div(new BigNumber(10).pow(9));
  }
};

export const getRandomNonce = (): number => (Math.random() * 64000) | 0;

export const ZERO_ADDRESS = '0:0000000000000000000000000000000000000000000000000000000000000000';

export const EMPTY_TVM_CELL = 'te6ccqEBAQEAAqAAAA==';

export const nodeUrl = (): string => {
  return JSON
    .parse(
      readFileSync(
        join(process.cwd(), 'muffin.config.json'),
        { encoding: 'utf-8' }
      )
    ).networks[process.argv[2] || 'local'].url;
}

export const giver = (): GiverOptions => {
  return JSON
    .parse(
      readFileSync(
        join(process.cwd(), 'muffin.config.json'),
        { encoding: 'utf-8' }
      )
    ).networks[process.argv[2] || 'local'].giver;
}

export const keys = (): KeysOptions => {
  return JSON
    .parse(
      readFileSync(
        join(process.cwd(), 'muffin.config.json'),
        { encoding: 'utf-8' }
      )
    ).networks[process.argv[2] || 'local'].keys;
}
