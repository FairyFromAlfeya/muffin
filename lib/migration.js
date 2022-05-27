"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
class Migration {
    constructor(log_path = 'muffin.migration.json') {
        this.log_path = (0, path_1.join)(process.cwd(), log_path);
        this.migration_log = {};
        this._loadMigrationLog();
    }
    _loadMigrationLog() {
        if ((0, fs_1.existsSync)(this.log_path)) {
            const data = (0, fs_1.readFileSync)(this.log_path, 'utf8');
            if (data)
                this.migration_log = JSON.parse(data);
        }
    }
    _saveMigrationLog() {
        (0, fs_1.writeFileSync)(this.log_path, JSON.stringify(this.migration_log));
    }
    load(contract, alias) {
        if (this.migration_log[alias] !== undefined) {
            contract.setAddress(this.migration_log[alias].address);
        }
        else {
            throw new Error(`Contract ${alias} not found in the migration`);
        }
        return contract;
    }
    store(contract, alias) {
        this.migration_log = Object.assign(Object.assign({}, this.migration_log), { [alias]: {
                address: contract.address,
                name: contract.name,
            } });
        this._saveMigrationLog();
    }
}
exports.Migration = Migration;
