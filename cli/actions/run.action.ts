import { Input } from '../commands/index';
import { AbstractAction } from './abstract.action';
import { spawn } from 'child_process';

export class RunAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]) {
    await RunAction.spawnChildProcess(options.find(o => o.name === 'script')!.value);

    process.exit(0);
  }

  private static spawnChildProcess(file: boolean | string) {
    return spawn('node', [file as string], {
      stdio: 'inherit',
      shell: true,
    });
  }
}
