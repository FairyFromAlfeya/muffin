import { AbstractAction } from '../actions';

export abstract class AbstractCommand {
  constructor(protected action: AbstractAction) {}

  public abstract load(): void;
}
