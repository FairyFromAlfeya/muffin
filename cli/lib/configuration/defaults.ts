import { Configuration } from './configuration';
import { resolve,  } from 'path';

export const defaultConfiguration: Required<Configuration> = {
  networks: {
    local: { url: `http://localhost` },
  },
  build: {
    directory: 'build',
    compiler: { path: resolve(__dirname, 'bin', 'solc-ton') },
    linker: { path: resolve(__dirname, 'bin', 'tvm-linker') },
  },
};
