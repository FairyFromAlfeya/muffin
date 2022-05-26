import { Runner } from './runner';
import { CopierRunner } from './copier.runner';
import { CompilerRunner } from './compiler.runner';
import { LinkerRunner } from './linker.runner';
import { TesterRunner } from './tester.runner';
import { Base64Runner } from './base64.runner';
export declare class RunnerFactory {
    static create(runner: Runner): CopierRunner | CompilerRunner | LinkerRunner | TesterRunner | Base64Runner | undefined;
}
