import { AbstractRunner } from './abstract.runner';

export class CopierRunner extends AbstractRunner {
  constructor() {
    super('cp');
  }
}
