interface CompilerOptions {
  path?: string;
}

interface LinkerOptions {
  path?: string;
}

export interface GiverOptions {
  address: string,
  abi: Record<string, any>,
  key: string,
}

export interface KeysOptions {
  phrase: string,
  amount: number,
}

interface NetworkOptions {
  url?: string;
  keys?: KeysOptions;
  giver?: GiverOptions;
}

interface BuildOptions {
  directory?: string;
  compiler?: CompilerOptions;
  linker?: LinkerOptions;
  stdlib?: string;
}

interface NetworksOptions {
  local?: NetworkOptions;
  devnet?: NetworkOptions;
  testnet?: NetworkOptions;
  mainnet?: NetworkOptions;
}

export interface Configuration {
  networks?: NetworksOptions,
  build?: BuildOptions,
}
