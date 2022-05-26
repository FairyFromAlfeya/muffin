import { existsSync } from 'fs';
import { join, posix } from 'path';
import { CommandLoader } from '../../commands/index';

const localBinPathSegments = [process.cwd(), 'node_modules', '@fairyfromalfeya', 'muffin'];

export function localBinExists() {
  return existsSync(join(...localBinPathSegments));
}

export function loadLocalBinCommandLoader(): typeof CommandLoader {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const commandsFile = require(posix.join(...localBinPathSegments, 'commands'));
  return commandsFile.CommandLoader;
}
