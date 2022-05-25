import { Input } from '../commands';
import { AbstractAction } from './abstract.action';
import { Runner, RunnerFactory } from '../lib/runners';
import { join } from 'path';
import { CompilerRunner } from '../lib/runners/compiler.runner';
import * as fs from 'fs';

export class BuildAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]) {
    await compileContracts().catch(() => process.exit(1));

    process.exit(0);
  }
}

const compileContracts = async () => {
  const runner = RunnerFactory.create(Runner.COMPILER) as CompilerRunner;

  const files = fs.readdirSync(join(process.cwd(), 'contracts'), { withFileTypes: true });

  for (const file of files) {
    if (file.isFile()) {
      await runner.run(`-i ../node_modules -o dist ${join(process.cwd(), 'contracts', file.name)}`);
    }
  }

  console.info();
};
