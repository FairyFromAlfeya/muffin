import { Configuration } from './configuration';

export const defaultConfiguration: Required<Configuration> = {
  networks: {
    local: { url: `http://localhost` },
  },
  build: {
    compiler: { path: '/usr/local/bin/solc-ton' },
    linker: { path: '/usr/local/bin/tvm-linker' },
  },
};
