import { Input } from '../commands/index';
import { AbstractAction } from './abstract.action';
export declare class BuildAction extends AbstractAction {
    handle(inputs: Input[], options: Input[]): Promise<void>;
}
