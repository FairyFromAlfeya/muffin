import { Configuration } from './configuration';
import { resolve,  } from 'path';

export const defaultConfiguration: Required<Configuration> = {
  networks: {
    local: { url: `http://localhost` },
  },
  build: {
    directory: 'build',
    compiler: { path: resolve(__dirname, 'bin', process.arch === 'arm64' ? 'solc-ton' : 'solc-ton-amd64') },
    linker: { path: resolve(__dirname, 'bin', process.arch === 'arm64' ? 'tvm-linker' : 'tvm-linker-amd64') },
    stdlib: resolve(__dirname, 'bin', 'stdlib_sol.tvm'),
  },
};
