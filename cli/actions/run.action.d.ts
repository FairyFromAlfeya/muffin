import { Input } from '../commands/index';
import { AbstractAction } from './abstract.action';
export declare class RunAction extends AbstractAction {
    handle(inputs: Input[], options: Input[]): Promise<void>;
    private static spawnChildProcess;
}
