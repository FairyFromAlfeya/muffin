import { Reader } from '../readers';
import { Configuration } from './configuration';
import { ConfigurationLoader } from './configuration.loader';
import { defaultConfiguration } from './defaults';

export class MuffinConfigurationLoader implements ConfigurationLoader {
  constructor(private readonly reader: Reader) {}

  public async load(name?: string): Promise<Required<Configuration>> {
    const content: string | undefined = name
      ? await this.reader.read(name)
      : await this.reader.readAnyOf(['muffin.config.json', 'muffin.json']);

    if (!content) {
      return defaultConfiguration;
    }

    const fileConfig = JSON.parse(content);

    return {
      ...defaultConfiguration,
      ...fileConfig,
      build: {
        ...defaultConfiguration.build,
        ...fileConfig.build,
      }
    };
  }
}
