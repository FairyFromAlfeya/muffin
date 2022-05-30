import { Input } from '../commands';
import { AbstractAction } from './abstract.action';
export declare class MigrateAction extends AbstractAction {
    handle(inputs: Input[], options: Input[]): Promise<void>;
    private static spawnChildProcess;
}
