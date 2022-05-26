import { Input } from '../commands/index';
import { AbstractAction } from './abstract.action';
export declare class LinkAction extends AbstractAction {
    handle(inputs: Input[], options: Input[]): Promise<void>;
}
