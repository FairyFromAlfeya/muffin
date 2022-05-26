"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfiguration = void 0;
exports.defaultConfiguration = {
    networks: {
        local: { url: `http://localhost` },
    },
    build: {
        compiler: { path: '/usr/local/bin/solc-ton' },
        linker: { path: '/usr/local/bin/tvm-linker' },
    },
};
