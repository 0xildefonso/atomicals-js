import { ElectrumApiInterface } from "../api/electrum-api.interface";
import { CommandInterface } from "./command.interface";
import { BaseRequestOptions } from "../interfaces/api.interface";
export declare class MintInteractiveDatCommand implements CommandInterface {
    private electrumApi;
    private filepath;
    private givenFileName;
    private address;
    private fundingWIF;
    private options;
    constructor(electrumApi: ElectrumApiInterface, filepath: string, givenFileName: string, address: string, fundingWIF: string, options: BaseRequestOptions);
    run(): Promise<any>;
}
