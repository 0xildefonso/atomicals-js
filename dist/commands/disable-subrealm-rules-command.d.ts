import { ElectrumApiInterface } from "../api/electrum-api.interface";
import { CommandInterface } from "./command.interface";
import { BaseRequestOptions } from "../interfaces/api.interface";
import { IWalletRecord } from "../utils/validate-wallet-storage";
export declare class DisableSubrealmRulesInteractiveCommand implements CommandInterface {
    private electrumApi;
    private atomicalId;
    private funding;
    private owner;
    private options;
    constructor(electrumApi: ElectrumApiInterface, atomicalId: string, funding: IWalletRecord, owner: IWalletRecord, options: BaseRequestOptions);
    run(): Promise<any>;
}
