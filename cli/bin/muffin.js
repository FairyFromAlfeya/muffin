#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const commands_1 = require("../commands");
const local_binaries_1 = require("../lib/utils/local-binaries");
const PackageJson = require("../../package.json");
const bootstrap = () => {
    commander_1.program
        .version(PackageJson.version, '-v, --version', 'Output the current version')
        .usage('<command> [options]')
        .helpOption('-h, --help', 'Output usage information');
    if ((0, local_binaries_1.localBinExists)()) {
        const localCommandLoader = (0, local_binaries_1.loadLocalBinCommandLoader)();
        localCommandLoader.load();
    }
    else {
        commands_1.CommandLoader.load();
    }
    commander_1.program.parse(process.argv);
    if (!process.argv.slice(2).length) {
        commander_1.program.outputHelp();
    }
};
bootstrap();
