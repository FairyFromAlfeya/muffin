import { CommanderStatic } from 'commander';
import { AbstractCommand } from './abstract.command';
export declare class MigrateCommand extends AbstractCommand {
    load(program: CommanderStatic): void;
}
