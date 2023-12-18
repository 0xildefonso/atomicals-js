import { ElectrumApiInterface } from "../api/electrum-api.interface";
import { CommandInterface } from "./command.interface";
import { AtomicalStatus } from "../interfaces/atomical-status.interface";
import { BaseRequestOptions } from "../interfaces/api.interface";
export interface ResolvedRealm {
    atomical: AtomicalStatus;
}
export declare class MintInteractiveDitemCommand implements CommandInterface {
    private electrumApi;
    private container;
    private requestDmitem;
    private manifestJsonFile;
    private address;
    private fundingWIF;
    private options;
    constructor(electrumApi: ElectrumApiInterface, container: string, requestDmitem: string, manifestJsonFile: string, address: string, fundingWIF: string, options: BaseRequestOptions);
    run(): Promise<any>;
}
