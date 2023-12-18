export declare const toXOnly: (publicKey: any) => any;
export declare const createKeyPair: (phrase?: string, path?: string) => Promise<{
    address: any;
    publicKey: string;
    publicKeyXOnly: any;
    path: string;
    WIF: string;
    privateKey: string | undefined;
}>;
export declare const createPrimaryAndFundingKeyPairs: (phrase?: string | undefined, path?: string | undefined) => Promise<{
    phrase: any;
    primary: {
        address: any;
        publicKey: string;
        publicKeyXOnly: any;
        path: string;
        WIF: string;
        privateKey: string | undefined;
    };
    funding: {
        address: any;
        publicKey: string;
        publicKeyXOnly: any;
        path: string;
        WIF: string;
        privateKey: string | undefined;
    };
}>;
export declare const createNKeyPairs: (phrase: any, n?: number) => Promise<{
    phrase: any;
    keypairs: any;
}>;
