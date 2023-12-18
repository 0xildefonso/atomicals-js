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
exports.SetInteractiveCommand = void 0;
const ecc = require("tiny-secp256k1");
const bitcoin = require('bitcoinjs-lib');
bitcoin.initEccLib(ecc);
const bitcoinjs_lib_1 = require("bitcoinjs-lib");
const command_helpers_1 = require("./command-helpers");
const atomical_operation_builder_1 = require("../utils/atomical-operation-builder");
const tinysecp = require('tiny-secp256k1');
(0, bitcoinjs_lib_1.initEccLib)(tinysecp);
class SetInteractiveCommand {
    constructor(electrumApi, options, atomicalId, filename, owner, funding) {
        this.electrumApi = electrumApi;
        this.options = options;
        this.atomicalId = atomicalId;
        this.filename = filename;
        this.owner = owner;
        this.funding = funding;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            (0, command_helpers_1.logBanner)(`Set Interactive`);
            // Attach any default data
            let filesData = yield (0, command_helpers_1.readJsonFileAsCompleteDataObjectEncodeAtomicalIds)(this.filename);
            const { atomicalInfo, locationInfo, inputUtxoPartial } = yield (0, command_helpers_1.getAndCheckAtomicalInfo)(this.electrumApi, this.atomicalId, this.owner.address);
            const atomicalBuilder = new atomical_operation_builder_1.AtomicalOperationBuilder({
                electrumApi: this.electrumApi,
                rbf: this.options.rbf,
                satsbyte: this.options.satsbyte,
                address: this.owner.address,
                disableMiningChalk: this.options.disableMiningChalk,
                opType: 'mod',
                nftOptions: {
                    satsoutput: this.options.satsoutput
                },
                meta: this.options.meta,
                ctx: this.options.ctx,
                init: this.options.init,
            });
            yield atomicalBuilder.setData(filesData);
            // Attach any requested bitwork
            if (this.options.bitworkc) {
                atomicalBuilder.setBitworkCommit(this.options.bitworkc);
            }
            // Add the atomical to update
            atomicalBuilder.addInputUtxo(inputUtxoPartial, this.owner.WIF);
            // The receiver output
            atomicalBuilder.addOutput({
                address: this.owner.address,
                value: this.options.satsoutput || 1000 // todo: determine how to auto detect the total input and set it to that
            });
            const result = yield atomicalBuilder.start(this.funding.WIF);
            return {
                success: true,
                data: result
            };
        });
    }
}
exports.SetInteractiveCommand = SetInteractiveCommand;
