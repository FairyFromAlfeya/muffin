import { Input } from '../commands/index';
import { AbstractAction } from './abstract.action';
import { Runner, RunnerFactory } from '../lib/runners/index';
import { join } from 'path';
import { CompilerRunner } from '../lib/runners/compiler.runner';
import { sync } from 'glob';

export class BuildAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]) {
    await compileContracts().catch(() => process.exit(1));

    process.exit(0);
  }
}

const compileContracts = async () => {
  const runner = RunnerFactory.create(Runner.COMPILER) as CompilerRunner;

  const files = sync('contracts/**/*.sol', { cwd: process.cwd() });
  console.log(files);

  for (const file of files) {
    await runner.run(`-i ${process.cwd()}/node_modules -o build ${join(process.cwd(), file)}`);
  }

  console.info();
};
