import { ElectrumApiInterface } from "../api/electrum-api.interface";
import { CommandInterface } from "./command.interface";
import { BaseRequestOptions } from "../interfaces/api.interface";
import { IWalletRecord } from "../utils/validate-wallet-storage";
export declare class SetInteractiveCommand implements CommandInterface {
    private electrumApi;
    private atomicalId;
    private filename;
    private owner;
    private funding;
    private options;
    constructor(electrumApi: ElectrumApiInterface, atomicalId: string, filename: string, owner: IWalletRecord, funding: IWalletRecord, options: BaseRequestOptions);
    run(): Promise<any>;
}
