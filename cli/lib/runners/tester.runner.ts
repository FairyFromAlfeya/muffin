import { AbstractRunner } from './abstract.runner';

export class TesterRunner extends AbstractRunner {
  constructor() {
    super('mocha');
  }
}
