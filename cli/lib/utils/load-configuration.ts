import { Configuration, ConfigurationLoader } from '../configuration';
import { MuffinConfigurationLoader } from '../configuration';
import { FileSystemReader } from '../readers';

export async function loadConfiguration(): Promise<Required<Configuration>> {
  const loader: ConfigurationLoader = new MuffinConfigurationLoader(
    new FileSystemReader(process.cwd()),
  );
  return loader.load();
}
