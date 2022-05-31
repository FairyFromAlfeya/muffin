import { Input } from '../commands';
import { AbstractAction } from './abstract.action';
import { Runner, RunnerFactory } from '../lib/runners';
import { join } from 'path';
import { CompilerRunner } from '../lib/runners/compiler.runner';
import { sync } from 'glob';
import { readFileSync } from 'fs';
import { loadConfiguration } from '../lib/utils/load-configuration';
import * as chalk from 'chalk';
import { EMOJIS } from '../lib/ui';

export class CompileAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]) {
    await compileContracts().catch(() => process.exit(1));

    process.exit(0);
  }
}

const compileContracts = async () => {
  const configuration = await loadConfiguration();
  const runner = RunnerFactory.create(Runner.COMPILER, configuration?.build?.compiler?.path) as CompilerRunner;

  const files = sync('contracts/**/*.sol', { cwd: process.cwd() });
  const sorted = files.filter((f) => {
    const filePath = join(process.cwd(), f);
    const fileData = readFileSync(filePath, { encoding: 'utf-8' });
    return (fileData.match(/^contract .+{/m) || []).length > 0;
  });

  console.info();
  console.info(EMOJIS.HAMMER, EMOJIS.HAMMER, EMOJIS.HAMMER, chalk.bgBlue(`        Compiling ${sorted.length} contracts       `), EMOJIS.HAMMER, EMOJIS.HAMMER, EMOJIS.HAMMER);
  console.info();

  for (const file of files) {
    const filePath = join(process.cwd(), file);
    const fileData = readFileSync(filePath, { encoding: 'utf-8' });
    const name = file.match(/\w+.sol$/)![0];

    if ((fileData.match(/^contract .+{/m) || []).length > 0) {
      await runner.run(`-i ${process.cwd()}/node_modules -o build ${join(process.cwd(), file)}`);
      console.info(chalk.blue('[COMPILED]'), chalk.green(`${file} => ${name.replace('.sol', '.code')} + ${name.replace('.sol', '.abi.json')}`));
    }
  }

  console.info();
  console.info(EMOJIS.HAMMER, EMOJIS.HAMMER, EMOJIS.HAMMER, chalk.bgBlue('Contracts were compiled successfully'), EMOJIS.HAMMER, EMOJIS.HAMMER, EMOJIS.HAMMER);
  console.info();
};
