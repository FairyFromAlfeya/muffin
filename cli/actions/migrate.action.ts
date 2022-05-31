import { Input } from '../commands';
import { AbstractAction } from './abstract.action';
import { spawn } from 'child_process';

export class MigrateAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]) {
    const child = await MigrateAction.spawnChildProcess(inputs.find(o => o.name === 'script')!.value);

    child.on('exit', () => process.exit(0));
  }

  private static spawnChildProcess(file: boolean | string) {
    return spawn('ts-node', [`migrations/${file}`], {
      stdio: 'inherit',
      shell: true,
    });
  }
}
