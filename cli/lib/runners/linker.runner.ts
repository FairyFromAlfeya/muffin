import { AbstractRunner } from './abstract.runner';

export class LinkerRunner extends AbstractRunner {
  constructor(linker: string) {
    super(linker);
  }
}
