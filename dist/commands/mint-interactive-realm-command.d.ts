import { ElectrumApiInterface } from "../api/electrum-api.interface";
import { CommandInterface } from "./command.interface";
import { BaseRequestOptions } from "../interfaces/api.interface";
export declare class MintInteractiveRealmCommand implements CommandInterface {
    private electrumApi;
    private requestRealm;
    private address;
    private fundingWIF;
    private options;
    constructor(electrumApi: ElectrumApiInterface, requestRealm: string, address: string, fundingWIF: string, options: BaseRequestOptions);
    run(): Promise<any>;
}
