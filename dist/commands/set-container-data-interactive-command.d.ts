import { ElectrumApiInterface } from "../api/electrum-api.interface";
import { CommandInterface } from "./command.interface";
import { BaseRequestOptions } from "../interfaces/api.interface";
import { IWalletRecord } from "../utils/validate-wallet-storage";
export declare class SetContainerDataInteractiveCommand implements CommandInterface {
    private electrumApi;
    private containerName;
    private filename;
    private owner;
    private funding;
    private options;
    constructor(electrumApi: ElectrumApiInterface, containerName: string, filename: string, owner: IWalletRecord, funding: IWalletRecord, options: BaseRequestOptions);
    run(): Promise<any>;
}
