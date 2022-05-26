declare const _default: {
    compiler: {
        path: string;
    };
    linker: {
        path: string;
    };
    networks: {
        local: {
            ton_client: {
                network: {
                    server_address: string;
                };
            };
            giver: {
                address: string;
                abi: {
                    "ABI version": number;
                    functions: {
                        name: string;
                        inputs: {
                            name: string;
                            type: string;
                        }[];
                        outputs: never[];
                    }[];
                    events: never[];
                    data: never[];
                };
                key: string;
            };
            keys: {
                phrase: string;
                amount: number;
            };
        };
    };
};
export default _default;
