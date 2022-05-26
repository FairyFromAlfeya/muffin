#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander = require("commander");
const index_1 = require("../commands/index");
const local_binaries_1 = require("../lib/utils/local-binaries");
const PackageJson = require("../../package.json");
const bootstrap = () => {
    const program = commander;
    program
        .version(PackageJson.version, '-v, --version', 'Output the current version')
        .usage('<command> [options]')
        .helpOption('-h, --help', 'Output usage information');
    if ((0, local_binaries_1.localBinExists)()) {
        const localCommandLoader = (0, local_binaries_1.loadLocalBinCommandLoader)();
        localCommandLoader.load(program);
    }
    else {
        index_1.CommandLoader.load(program);
    }
    commander.parse(process.argv);
    if (!process.argv.slice(2).length) {
        program.outputHelp();
    }
};
bootstrap();