import { TonClient } from '@tonclient/core';
import { libNode } from '@tonclient/lib-node';

TonClient.useBinaryLibrary(libNode);

export * from './lib/keys';
export * as utils from './lib/utils';
export * from './lib/factory';
export * from './lib/giver';
