import { APIInterface, BaseRequestOptions } from "./interfaces/api.interface";
declare const bitcoin: any;
export { ElectrumApiMock } from "./api/electrum-api-mock";
import { ConfigurationInterface } from "./interfaces/configuration.interface";
import { ElectrumApiInterface } from "./api/electrum-api.interface";
export { ElectrumApi } from "./api/electrum-api";
import { AtomicalsGetFetchType } from "./commands/command.interface";
import { CommandResultInterface } from "./commands/command-result.interface";
import { FileMap } from "./interfaces/filemap.interface";
import { IValidatedWalletInfo, IWalletRecord } from "./utils/validate-wallet-storage";
export { decorateAtomicals } from "./utils/atomical-format-helpers";
export { addressToP2PKH } from "./utils/address-helpers";
export { getExtendTaprootAddressKeypairPath } from "./utils/address-keypair-path";
export { createKeyPair } from "./utils/create-key-pair";
export { buildAtomicalsFileMapFromRawTx, hexifyObjectWithUtf8, isValidRealmName, isValidSubRealmName } from "./utils/atomical-format-helpers";
export { createMnemonicPhrase } from "./utils/create-mnemonic-phrase";
export { detectAddressTypeToScripthash, detectScriptToAddressType } from "./utils/address-helpers";
export { bitcoin };
export declare class Atomicals implements APIInterface {
    private electrumApi;
    constructor(electrumApi: ElectrumApiInterface);
    static createDmintItemManifests(folderName: string, output: string): Promise<CommandResultInterface>;
    static createDmint(folderName: string, mintHeight: number, bitworkc: string): Promise<CommandResultInterface>;
    static renderPreviews(filesmap: FileMap, body: boolean): Promise<any>;
    static walletCreate(): Promise<any>;
    static isObject(p: any): boolean;
    static encodeX(fileContents: any, updatedObject: any): Promise<{
        traits: {
            trait: string;
            type: string;
            values: string[];
        }[];
        items: any;
    } | undefined>;
    static walletImport(wif: string, alias: string): Promise<any>;
    static walletPhraseDecode(phrase: string, path: string): Promise<any>;
    static walletInit(phrase: string | undefined, path: string, n?: number): Promise<any>;
    serverVersion(): Promise<CommandResultInterface>;
    mintDatInteractive(options: BaseRequestOptions, filepath: string, givenFileName: string, address: string, WIF: string): Promise<CommandResultInterface>;
    mintNftInteractive(options: BaseRequestOptions, files: string[], address: string, WIF: string): Promise<CommandResultInterface>;
    mintRealmInteractive(options: BaseRequestOptions, requestRealm: string, address: string, WIF: string): Promise<CommandResultInterface>;
    mintSubrealmInteractive(options: BaseRequestOptions, requestSubRealm: string, address: string, WIF: string, owner: IWalletRecord): Promise<CommandResultInterface>;
    mintContainerItemInteractive(options: BaseRequestOptions, container: string, itemId: string, manifestFile: string, address: string, WIF: string, owner: IWalletRecord): Promise<CommandResultInterface>;
    mintContainerInteractive(options: BaseRequestOptions, requestContainer: string, address: string, WIF: string): Promise<CommandResultInterface>;
    mintFtInteractive(options: BaseRequestOptions, file: string, supply: number, address: string, requestTicker: string, WIF: string): Promise<CommandResultInterface>;
    mintDftInteractive(options: BaseRequestOptions, address: string, ticker: string, WIF: string): Promise<CommandResultInterface>;
    initDftInteractive(options: BaseRequestOptions, file: string, address: string, requestTicker: string, mintAmount: number, maxMints: number, mintHeight: number, mintBitworkc: string, mintBitworkr: string, WIF: string): Promise<CommandResultInterface>;
    disableSubrealmRules(options: BaseRequestOptions, realmOrSubrealm: string, funding: IWalletRecord, atomicalOwner: IWalletRecord): Promise<CommandResultInterface>;
    enableSubrealmRules(options: BaseRequestOptions, realmOrSubrealm: string, file: string, funding: IWalletRecord, atomicalOwner: IWalletRecord): Promise<CommandResultInterface>;
    setRelationInteractive(options: BaseRequestOptions, atomicalId: string, relationName: any, values: string[], funding: IWalletRecord, atomicalOwner: IWalletRecord): Promise<CommandResultInterface>;
    splatInteractive(options: BaseRequestOptions, atomicalId: string, funding: IWalletRecord, atomicalOwner: IWalletRecord): Promise<CommandResultInterface>;
    splitItneractive(options: BaseRequestOptions, atomicalId: string, funding: IWalletRecord, atomicalOwner: IWalletRecord): Promise<CommandResultInterface>;
    emitInteractive(options: BaseRequestOptions, atomicalId: string, files: string[], funding: IWalletRecord, atomicalOwner: IWalletRecord): Promise<CommandResultInterface>;
    setInteractive(options: BaseRequestOptions, atomicalId: string, filename: string, funding: IWalletRecord, atomicalOwner: IWalletRecord): Promise<CommandResultInterface>;
    setContainerDataInteractive(options: BaseRequestOptions, containerName: string, filename: string, funding: IWalletRecord, atomicalOwner: IWalletRecord): Promise<CommandResultInterface>;
    setContainerDmintInteractive(options: BaseRequestOptions, containerName: string, filename: string, funding: IWalletRecord, atomicalOwner: IWalletRecord): Promise<CommandResultInterface>;
    deleteInteractive(options: BaseRequestOptions, atomicalId: string, filesToDelete: string[], funding: IWalletRecord, atomicalOwner: IWalletRecord): Promise<CommandResultInterface>;
    sealInteractive(options: BaseRequestOptions, atomicalId: string, funding: IWalletRecord, atomicalOwner: IWalletRecord): Promise<CommandResultInterface>;
    transferInteractiveNft(options: BaseRequestOptions, atomicalId: string, owner: IWalletRecord, funding: IWalletRecord, receiveAddress: string, satsbyte: number, satsoutput: number): Promise<CommandResultInterface>;
    transferInteractiveFt(options: BaseRequestOptions, atomicalId: string, owner: IWalletRecord, funding: IWalletRecord, validatedWalletInfo: IValidatedWalletInfo, satsbyte: number, nofunding: boolean, atomicalIdReceipt?: string): Promise<CommandResultInterface>;
    transferInteractiveBuilder(options: BaseRequestOptions, owner: IWalletRecord, funding: IWalletRecord, validatedWalletInfo: IValidatedWalletInfo, satsbyte: number, nofunding: boolean, atomicalIdReceipt?: string, atomicalIdReceiptType?: string, forceSkipValidation?: boolean): Promise<CommandResultInterface>;
    transferInteractiveUtxos(options: BaseRequestOptions, owner: IWalletRecord, funding: IWalletRecord, validatedWalletInfo: IValidatedWalletInfo, satsbyte: number, nofunding: boolean, atomicalIdReceipt?: string): Promise<CommandResultInterface>;
    global(hashes?: number, keepElectrumAlive?: boolean): Promise<CommandResultInterface>;
    dump(keepElectrumAlive?: boolean): Promise<CommandResultInterface>;
    resolveAtomical(atomicalIdOrNumberOrVariousName: string, atomicalsGetFetchType: AtomicalsGetFetchType, verbose?: boolean, keepElectrumAlive?: boolean): Promise<CommandResultInterface>;
    getRealmInfo(atomicalIdOrNumberOrVariousName: string, verbose?: boolean, keepElectrumAlive?: boolean): Promise<CommandResultInterface>;
    getAtomical(atomicalAliasOrId: string, keepElectrumAlive?: boolean): Promise<CommandResultInterface>;
    getAtomicalFtInfo(atomicalAliasOrId: string, keepElectrumAlive?: boolean): Promise<CommandResultInterface>;
    getAtomicalLocation(atomicalAliasOrId: string, keepElectrumAlive?: boolean): Promise<CommandResultInterface>;
    getAtomicalState(atomicalAliasOrId: string, verbose?: boolean, keepElectrumAlive?: boolean): Promise<CommandResultInterface>;
    getAtomicalStateHistory(atomicalAliasOrId: string, keepElectrumAlive?: boolean): Promise<CommandResultInterface>;
    getAtomicalEventHistory(atomicalAliasOrId: string, keepElectrumAlive?: boolean): Promise<CommandResultInterface>;
    getAtomicalHistory(atomicalAliasOrId: string, keepElectrumAlive?: boolean): Promise<CommandResultInterface>;
    searchTickers(prefix: string | null, asc?: boolean, keepElectrumAlive?: boolean): Promise<CommandResultInterface>;
    searchContainers(prefix: string, asc?: boolean, keepElectrumAlive?: boolean): Promise<CommandResultInterface>;
    searchRealms(prefix: string, asc?: boolean, keepElectrumAlive?: boolean): Promise<CommandResultInterface>;
    getAtomicalByRealm(realm: string, keepElectrumAlive?: boolean): Promise<CommandResultInterface>;
    getAtomicalByTicker(ticker: string, keepElectrumAlive?: boolean): Promise<CommandResultInterface>;
    getAtomicalByContainer(container: string, keepElectrumAlive?: boolean): Promise<CommandResultInterface>;
    getContainerItems(container: string, limit: number, offset: number, keepElectrumAlive?: boolean): Promise<CommandResultInterface>;
    getAtomicalByContainerItem(container: string, itemId: string, keepElectrumAlive?: boolean): Promise<CommandResultInterface>;
    getAtomicalByContainerItemValidated(container: string, itemId: string, manifestFile: string): Promise<CommandResultInterface>;
    addressInfo(address: string, verbose: boolean): Promise<CommandResultInterface>;
    pendingSubrealms(options: BaseRequestOptions, address: string, funding: IWalletRecord, satsbyte: number, display?: boolean, keepElectrumAlive?: boolean): Promise<CommandResultInterface>;
    summarySubrealms(address: string, filter?: string, keepElectrumAlive?: boolean): Promise<CommandResultInterface>;
    summaryContainers(address: string, filter?: string, keepElectrumAlive?: boolean): Promise<CommandResultInterface>;
    summaryRealms(address: string, filter?: string, keepElectrumAlive?: boolean): Promise<CommandResultInterface>;
    summaryTickers(address: string, filter?: string, keepElectrumAlive?: boolean): Promise<CommandResultInterface>;
    walletInfo(address: string, verbose: boolean, keepElectrumAlive?: boolean): Promise<CommandResultInterface>;
    list(offset: number, limit: number, asc: boolean): Promise<CommandResultInterface>;
    getUtxos(address: string, keepElectrumAlive?: boolean): Promise<CommandResultInterface>;
    getHistory(address: string): Promise<CommandResultInterface>;
    getAtomicals(address: string): Promise<CommandResultInterface>;
    getTx(txid: string, verbose: boolean): Promise<CommandResultInterface>;
    download(locationIdOrTxId: string): Promise<CommandResultInterface>;
    broadcast(rawtx: string): Promise<CommandResultInterface>;
    getAtomicalsAtLocation(location: string): Promise<CommandResultInterface>;
    mergeInteractiveUtxos(options: BaseRequestOptions, owner: IWalletRecord, funding: IWalletRecord, validatedWalletInfo: IValidatedWalletInfo, satsbyte: number): Promise<CommandResultInterface>;
}
export declare function instance(config: ConfigurationInterface, electrumUrl: string): APIInterface;
