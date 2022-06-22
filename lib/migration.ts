import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export class Migration {
  private migration_log: Record<string, any>;
  private readonly log_path: string;

  constructor(log_path = 'muffin.migration.json') {
    this.log_path = join(process.cwd(), log_path);
    this.migration_log = {};
    this._loadMigrationLog();
  }

  _loadMigrationLog(): void {
    if (existsSync(this.log_path)) {
      const data = readFileSync(this.log_path, 'utf8');
      if (data) this.migration_log = JSON.parse(data);
    }
  }

  _saveMigrationLog(): void {
    writeFileSync(this.log_path, JSON.stringify(this.migration_log));
  }

  load(contract: any, alias: string): void {
    if (this.migration_log[alias] !== undefined) {
      contract.setAddress(this.migration_log[alias].address);
    } else {
      throw new Error(`Contract ${alias} not found in the migration`);
    }
  }

  store(contract: any, alias: string): void {
    this.migration_log = {
      ...this.migration_log,
      [alias]: {
        address: contract.address,
        name: contract.name,
      },
    };

    this._saveMigrationLog();
  }
}
