import { CommanderStatic } from 'commander';
import { AbstractCommand } from './abstract.command';
export declare class TestCommand extends AbstractCommand {
    load(program: CommanderStatic): void;
}
