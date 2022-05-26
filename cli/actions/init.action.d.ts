import { Input } from '../commands/index';
import { AbstractAction } from './abstract.action';
export declare class InitAction extends AbstractAction {
    handle(inputs: Input[], options: Input[]): Promise<void>;
}
export declare const exit: () => never;
