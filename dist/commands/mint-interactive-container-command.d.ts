import { ElectrumApiInterface } from "../api/electrum-api.interface";
import { CommandInterface } from "./command.interface";
import { BaseRequestOptions } from "../interfaces/api.interface";
export declare class MintInteractiveContainerCommand implements CommandInterface {
    private electrumApi;
    private requestContainer;
    private address;
    private fundingWIF;
    private options;
    constructor(electrumApi: ElectrumApiInterface, requestContainer: string, address: string, fundingWIF: string, options: BaseRequestOptions);
    run(): Promise<any>;
}
