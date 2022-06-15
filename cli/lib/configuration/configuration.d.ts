interface CompilerOptions {
    path?: string;
}
interface LinkerOptions {
    path?: string;
}
interface NetworkOptions {
    url?: string;
}
interface BuildOptions {
    directory?: string;
    compiler?: CompilerOptions;
    linker?: LinkerOptions;
    stdlib?: string;
}
interface NetworksOptions {
    local?: NetworkOptions;
    testnet?: NetworkOptions;
}
export interface Configuration {
    networks?: NetworksOptions;
    build?: BuildOptions;
}
export {};
