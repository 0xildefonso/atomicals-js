import { ElectrumApiInterface } from "../api/electrum-api.interface";
import { CommandInterface } from "./command.interface";
import { BaseRequestOptions } from "../interfaces/api.interface";
import { IWalletRecord } from "../utils/validate-wallet-storage";
export declare class SplatInteractiveCommand implements CommandInterface {
    private electrumApi;
    private locationId;
    private owner;
    private funding;
    private options;
    constructor(electrumApi: ElectrumApiInterface, locationId: string, owner: IWalletRecord, funding: IWalletRecord, options: BaseRequestOptions);
    run(): Promise<any>;
}
