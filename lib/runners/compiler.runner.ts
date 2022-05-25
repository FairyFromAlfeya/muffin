import { AbstractRunner } from './abstract.runner';

export class CompilerRunner extends AbstractRunner {
  constructor() {
    super('solc-ton');
  }
}
