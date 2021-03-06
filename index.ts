import { TonClient } from '@tonclient/core';
import { libNode } from '@tonclient/lib-node';

TonClient.useBinaryLibrary(libNode);

export * from './lib/keys';
export * as utils from './lib/utils';
export * from './lib/factory';
export * from './lib/giver';
export * from './lib/contract';
export * from './lib/account';
export * from './lib/migration';
export * from './lib/ton';
export { KeyPair } from '@tonclient/core/dist/modules';
