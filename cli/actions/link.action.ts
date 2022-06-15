import { Input } from '../commands';
import { AbstractAction } from './abstract.action';
import { Runner, RunnerFactory } from '../lib/runners';
import { join } from 'path';
import { CompilerRunner } from '../lib/runners/compiler.runner';
import * as fs from 'fs';
import { loadConfiguration } from '../lib/utils/load-configuration';
import * as chalk from 'chalk';
import { EMOJIS } from '../lib/ui';

export class LinkAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]) {
    await linkContracts().catch(() => process.exit(1));

    process.exit(0);
  }
}

const linkContracts = async () => {
  const configuration = await loadConfiguration();
  const runner = RunnerFactory.create(Runner.LINKER, configuration?.build?.linker?.path) as CompilerRunner;
  const runnerBase64 = RunnerFactory.create(Runner.BASE64) as CompilerRunner;

  const files = fs.readdirSync(join(process.cwd(), 'build'), { withFileTypes: true });
  const sorted = files.filter((f) => f.isFile() && f.name.endsWith('.code'));

  console.info();
  console.info(EMOJIS.LINK, EMOJIS.LINK, EMOJIS.LINK, chalk.bgBlue(`       Linking ${sorted.length} contracts       `), EMOJIS.LINK, EMOJIS.LINK, EMOJIS.LINK);
  console.info();

  for (const file of files) {
    if (file.isFile() && file.name.endsWith('.code')) {
      await runner.run(`compile --lib ${configuration?.build?.stdlib} ${join(process.cwd(), 'build', file.name)} -o ${join(process.cwd(), 'build', file.name.replace('.code','.tvc'))} `);
      console.info(chalk.blue('[LINKED]'), chalk.green(`${file.name} => ${file.name.replace('.code','.tvc')}`));
      await runnerBase64.run(`< ${join(process.cwd(), 'build', file.name.replace('.code','.tvc'))} > ${join(process.cwd(), 'build', file.name.replace('.code','.base64'))}`);
      console.info(chalk.blue('[ENCODED]'), chalk.green(`${file.name} => ${file.name.replace('.code','.base64')}`));
    }
  }

  console.info();
  console.info(EMOJIS.LINK, EMOJIS.LINK, EMOJIS.LINK, chalk.bgBlue('Contracts were linked successfully'), EMOJIS.LINK, EMOJIS.LINK, EMOJIS.LINK);
  console.info();
};
