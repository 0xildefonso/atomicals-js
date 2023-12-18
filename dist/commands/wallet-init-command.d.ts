import { CommandResultInterface } from "./command-result.interface";
import { CommandInterface } from "./command.interface";
export declare class WalletInitCommand implements CommandInterface {
    private phrase;
    private path;
    constructor(phrase: string | undefined, path: string);
    run(): Promise<CommandResultInterface>;
    walletExists(): Promise<true | undefined>;
}
