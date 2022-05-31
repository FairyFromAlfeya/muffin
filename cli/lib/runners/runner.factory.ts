import chalk from 'chalk';
import { Runner } from './runner';
import { CopierRunner } from './copier.runner';
import { CompilerRunner } from './compiler.runner';
import { LinkerRunner } from './linker.runner';
import { TesterRunner } from './tester.runner';
import { Base64Runner } from './base64.runner';
import { HandlebarRunner } from './handlebar.runner';

export class RunnerFactory {
  public static create(runner: Runner, options?: any) {
    switch (runner) {
      case Runner.COPIER:
        return new CopierRunner();
      case Runner.COMPILER:
        return new CompilerRunner(options);
      case Runner.LINKER:
        return new LinkerRunner(options);
      case Runner.TESTER:
        return new TesterRunner();
      case Runner.BASE64:
        return new Base64Runner();
      case Runner.HANDLEBAR:
        return new HandlebarRunner();
      default:
        console.info(chalk.yellow(`[WARN] Unsupported runner: ${runner}`));
    }
  }
}
