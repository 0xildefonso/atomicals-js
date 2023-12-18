import { ElectrumApiInterface } from "../api/electrum-api.interface";
import { CommandInterface } from "./command.interface";
import { BaseRequestOptions } from "../interfaces/api.interface";
export declare class MintInteractiveFtCommand implements CommandInterface {
    private electrumApi;
    private files;
    private supply;
    private address;
    private requestTicker;
    private fundingWIF;
    private options;
    constructor(electrumApi: ElectrumApiInterface, files: string[], supply: number, address: string, requestTicker: string, fundingWIF: string, options: BaseRequestOptions);
    run(): Promise<any>;
}
