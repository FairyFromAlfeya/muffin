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
    compiler?: CompilerOptions;
    linker?: LinkerOptions;
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
