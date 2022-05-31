import { Input } from '../commands';
import { AbstractAction } from './abstract.action';
import { spawn } from 'child_process';
import { EMOJIS } from '../lib/ui';
import * as chalk from 'chalk';

export class MigrateAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]) {

    console.info();
    console.info(EMOJIS.ROCKET, EMOJIS.ROCKET, EMOJIS.ROCKET, chalk.bgBlue(`    Deploying ${inputs.find(o => o.name === 'script')!.value}    `), EMOJIS.ROCKET, EMOJIS.ROCKET, EMOJIS.ROCKET);
    console.info();

    const child = await MigrateAction.spawnChildProcess(inputs.find(o => o.name === 'script')!.value);

    child.on('exit', () => {
      console.info();
      console.info(EMOJIS.ROCKET, EMOJIS.ROCKET, EMOJIS.ROCKET, chalk.bgBlue(`   ${inputs.find(o => o.name === 'script')!.value} was deployed  `), EMOJIS.ROCKET, EMOJIS.ROCKET, EMOJIS.ROCKET);
      console.info();
      process.exit(0)
    });
  }

  private static spawnChildProcess(file: boolean | string) {
    return spawn('ts-node', [`migrations/${file}`], {
      stdio: 'inherit',
      shell: true,
    });
  }
}
