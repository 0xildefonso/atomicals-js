import { ElectrumApiInterface } from "../api/electrum-api.interface";
export declare const getInputUtxoFromTxid: (utxo: {
    txId: string;
    outputIndex: number;
    value: number;
}, electrumx: ElectrumApiInterface) => Promise<{
    txId: string;
    outputIndex: number;
    value: number;
}>;
export declare const getFundingSelectedUtxo: (address: string, minFundingSatoshis: number, electrumx: ElectrumApiInterface) => Promise<any>;
/**
     * Gets a funding UTXO and also displays qr code for quick deposit
     * @param electrumxApi
     * @param address
     * @param amount
     * @returns
     */
export declare const getFundingUtxo: (electrumxApi: any, address: string, amount: number, suppressDepositAddressInfo?: boolean, seconds?: number) => Promise<any>;
