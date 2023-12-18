import { ElectrumApiInterface } from "../api/electrum-api.interface";
import { CommandInterface } from "./command.interface";
import { IWalletRecord } from "../utils/validate-wallet-storage";
import { BaseRequestOptions } from "../interfaces/api.interface";
export declare class SealInteractiveCommand implements CommandInterface {
    private electrumApi;
    private atomicalId;
    private owner;
    private funding;
    private options;
    constructor(electrumApi: ElectrumApiInterface, atomicalId: string, owner: IWalletRecord, funding: IWalletRecord, options: BaseRequestOptions);
    run(): Promise<any>;
}
