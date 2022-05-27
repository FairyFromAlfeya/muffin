export declare class Migration {
    private migration_log;
    private readonly log_path;
    constructor(log_path?: string);
    _loadMigrationLog(): void;
    _saveMigrationLog(): void;
    load(contract: any, alias: string): any;
    store(contract: any, alias: string): void;
}
