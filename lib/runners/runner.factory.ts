import * as chalk from 'chalk';
import { Runner } from './runner';
import { CopierRunner } from './copier.runner';

export class RunnerFactory {
  public static create(runner: Runner) {
    switch (runner) {
      case Runner.COPIER:
        return new CopierRunner();
      default:
        console.info(chalk.yellow(`[WARN] Unsupported runner: ${runner}`));
    }
  }
}
