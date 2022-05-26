import { Input } from '../commands';
import { AbstractAction } from './abstract.action';
import { Runner, RunnerFactory } from '../lib/runners';
import { join } from 'path';
import { CompilerRunner } from '../lib/runners/compiler.runner';
import { sync } from 'glob';
import { loadConfiguration } from '../lib/utils/load-configuration';

export class BuildAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]) {
    console.log('Compile contracts');
    await compileContracts().catch(() => process.exit(1));

    process.exit(0);
  }
}

const compileContracts = async () => {
  const configuration = await loadConfiguration();
  console.log(configuration);
  const runner = RunnerFactory.create(Runner.COMPILER, configuration?.build?.compiler?.path) as CompilerRunner;

  const files = sync('contracts/**/*.sol', { cwd: process.cwd() });
  console.log(files);

  for (const file of files) {
    await runner.run(`-i ${process.cwd()}/node_modules -o build ${join(process.cwd(), file)}`);
  }

  console.info();
};
