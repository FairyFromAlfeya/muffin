import { Input } from '../commands';
import { AbstractAction } from './abstract.action';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import * as Handlebars from 'handlebars';
import { EMOJIS } from '../lib/ui';
import * as chalk from 'chalk';

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
    case 'uint8':
    case 'uint16':
    case 'uint24':
    case 'uint32':
    case 'uint40':
    case 'uint48':
    case 'uint56':
    case 'uint64':
    case 'uint72':
    case 'uint80':
    case 'uint88':
    case 'uint96':
    case 'uint104':
    case 'uint112':
    case 'uint120':
    case 'uint128':
    case 'uint136':
    case 'uint144':
    case 'uint152':
    case 'uint160':
    case 'uint168':
    case 'uint176':
    case 'uint256':
      return 'BigNumber';
    case 'bool':
      return 'boolean';
    case 'cell':
    case 'address':
      return 'string';
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
        case 'uint8':
        case 'uint16':
        case 'uint24':
        case 'uint32':
        case 'uint40':
        case 'uint48':
        case 'uint56':
        case 'uint64':
        case 'uint72':
        case 'uint80':
        case 'uint88':
        case 'uint96':
        case 'uint104':
        case 'uint112':
        case 'uint120':
        case 'uint128':
        case 'uint136':
        case 'uint144':
        case 'uint152':
        case 'uint160':
        case 'uint168':
        case 'uint176':
        case 'uint256':
          return 'BigNumber';
        case 'bool':
          return 'boolean';
        case 'tuple':
        case 'optional(tuple)':
          return tupleToType(components);
        case 'cell':
        case 'address':
          return 'string';
        default:
          return type;
      }
    });

    console.info();
    console.info(EMOJIS.FIRE, EMOJIS.FIRE, EMOJIS.FIRE, chalk.bgBlue('        Typing 1 contract        '), EMOJIS.FIRE, EMOJIS.FIRE, EMOJIS.FIRE);
    console.info();

    const template = Handlebars.compile(readFileSync(`${__dirname}/../lib/schematic/contract.hbs`, { encoding: 'utf-8' }));
    const data = readFileSync(join(process.cwd(), file), { encoding: 'utf-8' });
    const abi = JSON.parse(data);
    const name = file.match(/\w+\.abi\.json/)![0];
    mkdirSync(join(process.cwd(), 'evertype'), { recursive: true });
    const savePath = join(process.cwd(), 'evertype', name.replace('abi.json', 'ts'));
    writeFileSync(savePath, template({ class: { name: name.replace('.abi.json', '') }, abi }));
    console.info(chalk.blue('[TYPED]'), chalk.green(`${name} => evertype/${name.replace('abi.json', 'ts')}`));
    console.info();
    console.info(EMOJIS.FIRE, EMOJIS.FIRE, EMOJIS.FIRE, chalk.bgBlue('Contracts were typed successfully'), EMOJIS.FIRE, EMOJIS.FIRE, EMOJIS.FIRE);
  } catch (e) {
    console.error(e)
  }
  console.info();
};
