#!/usr/bin/env node
import { program } from 'commander';
import { CommandLoader } from '../commands';
import {
  loadLocalBinCommandLoader,
  localBinExists,
} from '../lib/utils/local-binaries';
import * as PackageJson from '../../package.json';
import { libNode } from '@tonclient/lib-node';
import { TonClient } from '@tonclient/core';

TonClient.useBinaryLibrary(libNode);

const bootstrap = () => {
  program
    .version(
      PackageJson.version,
      '-v, --version',
      'Output the current version',
    )
    .usage('<command> [options]')
    .helpOption('-h, --help', 'Output usage information');

  if (localBinExists()) {
    const localCommandLoader = loadLocalBinCommandLoader();
    localCommandLoader.load();
  } else {
    CommandLoader.load();
  }

  program.parse(process.argv);

  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
};

bootstrap();
