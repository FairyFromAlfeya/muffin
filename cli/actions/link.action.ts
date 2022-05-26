import { Input } from '../commands/index';
import { AbstractAction } from './abstract.action';
import { Runner, RunnerFactory } from '../lib/runners/index';
import { join } from 'path';
import { CompilerRunner } from '../lib/runners/compiler.runner';
import * as fs from 'fs';

export class LinkAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]) {
    await linkContracts().catch(() => process.exit(1));

    process.exit(0);
  }
}

const linkContracts = async () => {
  const runner = RunnerFactory.create(Runner.LINKER) as CompilerRunner;
  const runnerBase64 = RunnerFactory.create(Runner.BASE64) as CompilerRunner;

  const files = fs.readdirSync(join(process.cwd(), 'build'), { withFileTypes: true });

  for (const file of files) {
    if (file.isFile() && file.name.endsWith('.code')) {
      await runner.run(`compile ${join(process.cwd(), 'build', file.name)} -o ${join(process.cwd(), 'build', file.name.replace('.code','.tvc'))} `);
      await runnerBase64.run(`< ${join(process.cwd(), 'build', file.name.replace('.code','.tvc'))} > ${join(process.cwd(), 'build', file.name.replace('.code','.base64'))}`);
    }
  }

  console.info();
};
