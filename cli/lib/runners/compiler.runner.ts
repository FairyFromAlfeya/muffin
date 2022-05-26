import { AbstractRunner } from './abstract.runner';

export class CompilerRunner extends AbstractRunner {
  constructor(compiler: string) {
    super(compiler);
  }
}
