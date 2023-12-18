import { ElectrumApiInterface } from "../api/electrum-api.interface";
import { CommandInterface } from "./command.interface";
import { BaseRequestOptions } from "../interfaces/api.interface";
import { IWalletRecord } from "../utils/validate-wallet-storage";
export declare class SetRelationInteractiveCommand implements CommandInterface {
    private electrumApi;
    private atomicalId;
    private relationName;
    private values;
    private owner;
    private funding;
    private options;
    constructor(electrumApi: ElectrumApiInterface, atomicalId: string, relationName: string, values: string[], owner: IWalletRecord, funding: IWalletRecord, options: BaseRequestOptions);
    run(): Promise<any>;
}
