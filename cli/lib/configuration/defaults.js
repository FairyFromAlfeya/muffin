"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfiguration = void 0;
const path_1 = require("path");
exports.defaultConfiguration = {
    networks: {
        local: { url: `http://localhost` },
    },
    build: {
        directory: 'build',
        compiler: { path: (0, path_1.resolve)(__dirname, 'bin', 'solc-ton') },
        linker: { path: (0, path_1.resolve)(__dirname, 'bin', 'tvm-linker') },
    },
};
