import { Input } from '../commands';
import { AbstractAction } from './abstract.action';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import * as Handlebars from 'handlebars';

export class GenEvertypeAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]) {
    const filePath = options.find((opt) => opt.name === 'file')!.value;
    await genEvertype(filePath as string).catch(() => process.exit(1));

    process.exit(0);
  }
}

const replaceAll = function(str: string, search: string, replacement: string): string {
  return str.replace(new RegExp(search, 'g'), replacement);
};

const tupleToType = (components: { name: string; type: string }[]) => {
  const obj: Record<string, string> = {};

  components.forEach((comp) => { obj[comp.name] = solTypeToJs(comp.type); });

  return replaceAll(replaceAll(JSON.stringify(obj), '"', ''), ',', '; ');
}

const solTypeToJs = (type: string): string => {
  switch (type) {
    case 'uint64':
    case 'uint32':
    case 'uint256':
      return 'BigNumber';
    case 'bool':
      return 'boolean';
    default:
      return type;
  }
}

const genEvertype = async (file: string) => {
  try {
    Handlebars.registerHelper('IfNotEquals', (arg1: any, arg2: any, options: any) => {
      return (arg1 !== arg2) ? options.fn(this) : options.inverse(this);
    });
    Handlebars.registerHelper('Type', (type: string, components: any) => {
      switch (type) {
        case 'uint64':
        case 'uint32':
        case 'uint256':
          return 'BigNumber';
        case 'bool':
          return 'boolean';
        case 'tuple':
          return tupleToType(components);
        default:
          return type;
      }
    });
    const template = Handlebars.compile(readFileSync(`${__dirname}/../lib/schematic/contract.hbs`, { encoding: 'utf-8' }));
    const data = readFileSync(join(process.cwd(), file), { encoding: 'utf-8' });
    const abi = JSON.parse(data);
    const name = file.match(/\w+\.abi\.json/)![0];
    const savePath = join(process.cwd(), 'evertype', name.replace('abi.json', 'ts'));
    writeFileSync(savePath, template({ class: { name: name.replace('.abi.json', '') }, abi }));
  } catch (e) {
    console.error(e)
  }
  console.info();
};
