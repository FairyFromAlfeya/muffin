import * as chalk from 'chalk';
import { ChildProcess, spawn, SpawnOptions } from 'child_process';
import { MESSAGES } from '../ui';

export class AbstractRunner {
  constructor(protected binary: string, protected args: string[] = []) {}

  public async run(
    command: string,
    collect = false,
    cwd: string = process.cwd(),
  ): Promise<null | string> {
    const args: string[] = [command];
    const options: SpawnOptions = {
      cwd,
      stdio: 'inherit',
      shell: true,
    };

    return new Promise<null | string>((resolve, reject) => {
      const child: ChildProcess = spawn(
        `${this.binary}`,
        [...this.args, ...args],
        options,
      );

      child.on('close', (code) => {
        if (code === 0) {
          resolve(null);
        } else {
          console.error(
            chalk.red(MESSAGES.RUNNER_EXECUTION_ERROR(`${this.binary} ${command}`)),
          );
          reject();
        }
      });
    });
  }
}
