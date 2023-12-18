"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectrumApi = void 0;
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
const address_helpers_1 = require("../utils/address-helpers");
const axios_1 = require("axios");
class ElectrumApi {
    constructor(baseUrl, usePost = true) {
        this.baseUrl = baseUrl;
        this.usePost = usePost;
        this.isOpenFlag = false;
        this.resetConnection();
    }
    resetConnection() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    static createClient(url) {
        return new ElectrumApi(url);
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Promise((resolve, reject) => {
                if (this.isOpenFlag) {
                    resolve(true);
                    return;
                }
                resolve(true);
            });
            return p;
        });
    }
    isOpen() {
        return this.isOpenFlag;
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Promise((resolve, reject) => {
                resolve(true);
            });
            return p;
        });
    }
    call(method, params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.usePost) {
                const response = yield axios_1.default.post(this.baseUrl + '/' + method, { params });
                return response.data.response;
            }
            else {
                const response = yield axios_1.default.get(this.baseUrl + '/' + method + '?params=' + JSON.stringify(params));
                return response.data.response;
            }
        });
    }
    sendTransaction(signedRawtx) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.broadcast(signedRawtx);
        });
    }
    getTx(txid, verbose = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Promise((resolve, reject) => {
                this.call('blockchain.transaction.get', [txid, verbose ? 1 : 0]).then(function (result) {
                    resolve({
                        success: true,
                        tx: result
                    });
                }).catch((error) => {
                    reject(error);
                });
            });
            return p;
        });
    }
    getUnspentAddress(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const { scripthash } = (0, address_helpers_1.detectAddressTypeToScripthash)(address);
            return this.getUnspentScripthash(scripthash);
        });
    }
    getUnspentScripthash(scripthash) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Promise((resolve, reject) => {
                this.call('blockchain.scripthash.listunspent', [scripthash]).then(function (result) {
                    const data = {
                        unconfirmed: 0,
                        confirmed: 0,
                        //balance: 0,
                        utxos: []
                    };
                    for (const utxo of result) {
                        if (!utxo.height || utxo.height <= 0) {
                            data.unconfirmed += utxo.value;
                        }
                        else {
                            data.confirmed += utxo.value;
                        }
                        //data.balance += utxo.value;
                        data.utxos.push({
                            txid: utxo.tx_hash,
                            txId: utxo.tx_hash,
                            // height: utxo.height,
                            outputIndex: utxo.tx_pos,
                            index: utxo.tx_pos,
                            vout: utxo.tx_pos,
                            value: utxo.value,
                            atomicals: utxo.atomicals,
                            //script: addressToP2PKH(address)
                        });
                    }
                    resolve(data);
                }).catch((error) => {
                    reject(error);
                });
            });
            return p;
        });
    }
    waitUntilUTXO(address, satoshis, intervalSeconds = 10, exactSatoshiAmount = false) {
        return __awaiter(this, void 0, void 0, function* () {
            function hasAttachedAtomicals(utxo) {
                if (utxo && utxo.atomicals && utxo.atomicals.length) {
                    return true;
                }
                if (utxo && utxo.height <= 0) {
                    return true;
                }
                return false;
            }
            return new Promise((resolve, reject) => {
                let intervalId;
                const checkForUtxo = () => __awaiter(this, void 0, void 0, function* () {
                    console.log('...');
                    try {
                        const response = yield this.getUnspentAddress(address);
                        const utxos = response.utxos;
                        for (const utxo of utxos) {
                            // Do not use utxos that have attached atomicals
                            if (hasAttachedAtomicals(utxo)) {
                                continue;
                            }
                            // If the exact amount was requested, then only return if the exact amount is found
                            if (exactSatoshiAmount) {
                                if (utxo.value === satoshis) {
                                    clearInterval(intervalId);
                                    resolve(utxo);
                                    return;
                                }
                            }
                            else {
                                if (utxo.value >= satoshis) {
                                    clearInterval(intervalId);
                                    resolve(utxo);
                                    return;
                                }
                            }
                        }
                    }
                    catch (error) {
                        console.log('error', error);
                        reject(error);
                        clearInterval(intervalId);
                    }
                });
                intervalId = setInterval(checkForUtxo, intervalSeconds * 1000);
            });
        });
    }
    serverVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Promise((resolve, reject) => {
                this.call('server.version', []).then(function (result) {
                    resolve(result);
                }).catch((error) => {
                    reject(error);
                });
            });
            return p;
        });
    }
    broadcast(rawtx, force = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Promise((resolve, reject) => {
                if (force) {
                    this.call('blockchain.transaction.broadcast_force', [rawtx]).then(function (result) {
                        resolve(result);
                    }).catch((error) => {
                        console.log(error);
                        reject(error);
                    });
                }
                else {
                    this.call('blockchain.transaction.broadcast', [rawtx]).then(function (result) {
                        resolve(result);
                    }).catch((error) => {
                        console.log(error);
                        reject(error);
                    });
                }
            });
            return p;
        });
    }
    dump() {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Promise((resolve, reject) => {
                this.call('blockchain.atomicals.dump', []).then(function (result) {
                    resolve(result);
                }).catch((error) => {
                    console.log('error ', error);
                    reject(error);
                });
            });
            return p;
        });
    }
    atomicalsGetGlobal(hashes) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Promise((resolve, reject) => {
                this.call('blockchain.atomicals.get_global', [hashes]).then(function (result) {
                    console.log('response', result);
                    resolve(result);
                }).catch((error) => {
                    console.log('error ', error);
                    reject(error);
                });
            });
            return p;
        });
    }
    atomicalsGet(atomicalAliasOrId) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Promise((resolve, reject) => {
                this.call('blockchain.atomicals.get', [atomicalAliasOrId]).then(function (result) {
                    resolve(result);
                }).catch((error) => {
                    console.log('error ', error);
                    reject(error);
                });
            });
            return p;
        });
    }
    atomicalsGetFtInfo(atomicalAliasOrId) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Promise((resolve, reject) => {
                this.call('blockchain.atomicals.get_ft_info', [atomicalAliasOrId]).then(function (result) {
                    resolve(result);
                }).catch((error) => {
                    console.log('error ', error);
                    reject(error);
                });
            });
            return p;
        });
    }
    atomicalsGetLocation(atomicalAliasOrId) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Promise((resolve, reject) => {
                this.call('blockchain.atomicals.get_location', [atomicalAliasOrId]).then(function (result) {
                    resolve(result);
                }).catch((error) => {
                    console.log('error ', error);
                    reject(error);
                });
            });
            return p;
        });
    }
    atomicalsGetStateHistory(atomicalAliasOrId) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Promise((resolve, reject) => {
                this.call('blockchain.atomicals.get_state_history', [atomicalAliasOrId]).then(function (result) {
                    resolve(result);
                }).catch((error) => {
                    console.log('error ', error);
                    reject(error);
                });
            });
            return p;
        });
    }
    atomicalsGetState(atomicalAliasOrId, verbose) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Promise((resolve, reject) => {
                this.call('blockchain.atomicals.get_state', [atomicalAliasOrId, verbose ? 1 : 0]).then(function (result) {
                    resolve(result);
                }).catch((error) => {
                    console.log('error ', error);
                    reject(error);
                });
            });
            return p;
        });
    }
    atomicalsGetEventHistory(atomicalAliasOrId) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Promise((resolve, reject) => {
                this.call('blockchain.atomicals.get_events', [atomicalAliasOrId]).then(function (result) {
                    resolve(result);
                }).catch((error) => {
                    console.log('error ', error);
                    reject(error);
                });
            });
            return p;
        });
    }
    atomicalsGetTxHistory(atomicalAliasOrId) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Promise((resolve, reject) => {
                this.call('blockchain.atomicals.get_tx_history', [atomicalAliasOrId]).then(function (result) {
                    resolve(result);
                }).catch((error) => {
                    console.log('error ', error);
                    reject(error);
                });
            });
            return p;
        });
    }
    history(scripthash) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Promise((resolve, reject) => {
                this.call('blockchain.scripthash.get_history', [scripthash]).then(function (result) {
                    resolve(result);
                }).catch((error) => {
                    console.log('error ', error);
                    reject(error);
                });
            });
            return p;
        });
    }
    atomicalsList(limit, offset, asc = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Promise((resolve, reject) => {
                this.call('blockchain.atomicals.list', [limit, offset, asc ? 1 : 0]).then(function (result) {
                    resolve(result);
                }).catch((error) => {
                    console.log('error ', error);
                    reject(error);
                });
            });
            return p;
        });
    }
    atomicalsByScripthash(scripthash, verbose = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Promise((resolve, reject) => {
                const params = [scripthash];
                if (verbose) {
                    params.push(true);
                }
                this.call('blockchain.atomicals.listscripthash', params).then(function (result) {
                    resolve(result);
                }).catch((error) => {
                    console.log('error ', error);
                    reject(error);
                });
            });
            return p;
        });
    }
    atomicalsByAddress(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const { scripthash } = (0, address_helpers_1.detectAddressTypeToScripthash)(address);
            return this.atomicalsByScripthash(scripthash);
        });
    }
    atomicalsAtLocation(location) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Promise((resolve, reject) => {
                this.call('blockchain.atomicals.at_location', [location]).then(function (result) {
                    resolve(result);
                }).catch((error) => {
                    console.log('error ', error);
                    reject(error);
                });
            });
            return p;
        });
    }
    txs(txs, verbose) {
        return __awaiter(this, void 0, void 0, function* () {
            let p;
            if (true) {
                p = [];
                for (const tx of txs) {
                    p.push(new Promise((resolve, reject) => {
                        this.call('blockchain.transaction.get', [tx, verbose ? 1 : 0]).then(function (result) {
                            resolve(result);
                        }).catch((error) => {
                            console.log('error ', error);
                            reject(error);
                        });
                    }));
                }
                return Promise.all(p);
            }
        });
    }
    atomicalsGetRealmInfo(realmOrSubRealm, verbose) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Promise((resolve, reject) => {
                this.call('blockchain.atomicals.get_realm_info', [realmOrSubRealm, verbose ? 1 : 0]).then(function (result) {
                    resolve(result);
                }).catch((error) => {
                    console.log('error ', error);
                    reject(error);
                });
            });
            return p;
        });
    }
    atomicalsGetByRealm(realm) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Promise((resolve, reject) => {
                this.call('blockchain.atomicals.get_by_realm', [realm]).then(function (result) {
                    resolve(result);
                }).catch((error) => {
                    console.log('error ', error);
                    reject(error);
                });
            });
            return p;
        });
    }
    atomicalsGetByTicker(ticker) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Promise((resolve, reject) => {
                this.call('blockchain.atomicals.get_by_ticker', [ticker]).then(function (result) {
                    resolve(result);
                }).catch((error) => {
                    console.log('error ', error);
                    reject(error);
                });
            });
            return p;
        });
    }
    atomicalsGetByContainer(container) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Promise((resolve, reject) => {
                this.call('blockchain.atomicals.get_by_container', [container]).then(function (result) {
                    resolve(result);
                }).catch((error) => {
                    console.log('error ', error);
                    reject(error);
                });
            });
            return p;
        });
    }
    atomicalsGetContainerItems(container, limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Promise((resolve, reject) => {
                this.call('blockchain.atomicals.get_container_items', [container, limit, offset]).then(function (result) {
                    resolve(result);
                }).catch((error) => {
                    console.log('error ', error);
                    reject(error);
                });
            });
            return p;
        });
    }
    atomicalsGetByContainerItem(container, itemName) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Promise((resolve, reject) => {
                this.call('blockchain.atomicals.get_by_container_item', [container, itemName]).then(function (result) {
                    resolve(result);
                }).catch((error) => {
                    console.log('error ', error);
                    reject(error);
                });
            });
            return p;
        });
    }
    atomicalsGetByContainerItemValidated(container, item, bitworkc, bitworkr, main, mainHash, proof, checkWithoutSealed) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Promise((resolve, reject) => {
                this.call('blockchain.atomicals.get_by_container_item_validate', [container, item, bitworkc, bitworkr, main, mainHash, proof, checkWithoutSealed]).then(function (result) {
                    resolve(result);
                }).catch((error) => {
                    console.log('error ', error);
                    reject(error);
                });
            });
            return p;
        });
    }
    atomicalsFindTickers(prefix, asc) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Promise((resolve, reject) => {
                const args = [];
                args.push(prefix ? prefix : null);
                if (!asc) {
                    args.push(1);
                }
                else {
                    args.push(0);
                }
                this.call('blockchain.atomicals.find_tickers', args).then(function (result) {
                    resolve(result);
                }).catch((error) => {
                    console.log('error ', error);
                    reject(error);
                });
            });
            return p;
        });
    }
    atomicalsFindContainers(prefix, asc) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Promise((resolve, reject) => {
                const args = [];
                args.push(prefix ? prefix : null);
                if (!asc) {
                    args.push(1);
                }
                else {
                    args.push(0);
                }
                this.call('blockchain.atomicals.find_containers', args).then(function (result) {
                    resolve(result);
                }).catch((error) => {
                    console.log('error ', error);
                    reject(error);
                });
            });
            return p;
        });
    }
    atomicalsFindRealms(prefix, asc) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Promise((resolve, reject) => {
                const args = [];
                args.push(prefix ? prefix : null);
                if (!asc) {
                    args.push(1);
                }
                else {
                    args.push(0);
                }
                this.call('blockchain.atomicals.find_realms', args).then(function (result) {
                    resolve(result);
                }).catch((error) => {
                    console.log('error ', error);
                    reject(error);
                });
            });
            return p;
        });
    }
    atomicalsFindSubRealms(parentRealmId, prefix, asc) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Promise((resolve, reject) => {
                const args = [];
                args.push(prefix ? prefix : null);
                if (!asc) {
                    args.push(1);
                }
                else {
                    args.push(0);
                }
                this.call('blockchain.atomicals.find_subrealms', [parentRealmId, args]).then(function (result) {
                    resolve(result);
                }).catch((error) => {
                    console.log('error ', error);
                    reject(error);
                });
            });
            return p;
        });
    }
}
exports.ElectrumApi = ElectrumApi;
