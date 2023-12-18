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
exports.SearchTickersCommand = void 0;
class SearchTickersCommand {
    constructor(electrumApi, prefix, asc) {
        this.electrumApi = electrumApi;
        this.prefix = prefix;
        this.asc = asc;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const responseResult = yield this.electrumApi.atomicalsFindTickers(this.prefix, this.asc);
            if (!responseResult.result) {
                return {
                    success: false,
                    data: responseResult
                };
            }
            else if (responseResult.result) {
                return {
                    success: true,
                    data: responseResult.result
                };
            }
        });
    }
}
exports.SearchTickersCommand = SearchTickersCommand;