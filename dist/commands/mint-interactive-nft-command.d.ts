import { ElectrumApiInterface } from "../api/electrum-api.interface";
import { CommandInterface } from "./command.interface";
import { BaseRequestOptions } from "../interfaces/api.interface";
export declare class MintInteractiveNftCommand implements CommandInterface {
    private electrumApi;
    private files;
    private address;
    private fundingWIF;
    private options;
    constructor(electrumApi: ElectrumApiInterface, files: string[], address: string, fundingWIF: string, options: BaseRequestOptions);
    run(): Promise<any>;
}
