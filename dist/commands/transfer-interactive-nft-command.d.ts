import { ElectrumApiInterface } from "../api/electrum-api.interface";
import { CommandInterface } from "./command.interface";
import { AtomicalStatus } from "../interfaces/atomical-status.interface";
export declare class TransferInteractiveNftCommand implements CommandInterface {
    private electrumApi;
    private atomicalAliasOrId;
    private currentOwnerAtomicalWIF;
    private receiveAddress;
    private fundingWIF;
    private satsbyte;
    private satsoutput;
    constructor(electrumApi: ElectrumApiInterface, atomicalAliasOrId: string, currentOwnerAtomicalWIF: string, receiveAddress: string, fundingWIF: string, satsbyte: number, satsoutput: number);
    run(): Promise<any>;
    performTransfer(atomical: AtomicalStatus, atomicalKeypair: any, fundingKeypair: any, satsbyte: number, satsoutput: number, receiveAddress: string): Promise<any>;
}
