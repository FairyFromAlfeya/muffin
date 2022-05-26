import { Reader } from '../readers';
import { Configuration } from './configuration';
import { ConfigurationLoader } from './configuration.loader';
export declare class MuffinConfigurationLoader implements ConfigurationLoader {
    private readonly reader;
    constructor(reader: Reader);
    load(name?: string): Promise<Required<Configuration>>;
}
