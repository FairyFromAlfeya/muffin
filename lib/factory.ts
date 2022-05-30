import { resolve } from 'path';
import { loadBase64FromFile, loadJSONFromFile } from './utils';
import { Contract } from './contract';
import { Account } from './account';
import { TonClient } from '@tonclient/core';

class Factory {
  client = new TonClient({ network: { server_address: 'http://localhost:80/' } });

  async initializeContract(name: string, resolvedPath: string): Promise<Contract> {
    const base64 = loadBase64FromFile(`${resolvedPath}/${name}.base64`);
    const abi = loadJSONFromFile(`${resolvedPath}/${name}.abi.json`);

    const { code } = await this.client.boc.get_code_from_tvc({ tvc: base64, });

    return new Contract({
      abi,
      base64,
      code,
      name,
    });
  }

  async getContract(name: string, build = 'build'): Promise<Contract> {
    const resolvedBuildPath = resolve(process.cwd(), build);

    return this.initializeContract(name, resolvedBuildPath);
  }

  async getAccount(name = 'Account', build = 'build'): Promise<Account> {
    const resolvedBuildPath = resolve(process.cwd(), build);

    const contract = await this.initializeContract(name, resolvedBuildPath);

    return new Account({
      abi: contract.abi,
      base64: contract.base64,
      code: contract.code,
      name: contract.name,
    });
  }
}

export const factory = new Factory();
