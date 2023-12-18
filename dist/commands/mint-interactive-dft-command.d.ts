import { ElectrumApiInterface } from "../api/electrum-api.interface";
import { CommandInterface } from "./command.interface";
import { BaseRequestOptions } from "../interfaces/api.interface";
export declare class MintInteractiveDftCommand implements CommandInterface {
    private electrumApi;
    private address;
    private ticker;
    private fundingWIF;
    private options;
    constructor(electrumApi: ElectrumApiInterface, address: string, ticker: string, fundingWIF: string, options: BaseRequestOptions);
    run(): Promise<any>;
}
