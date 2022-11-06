export default class api {
    constructor(host: string, token: any);
    token: any;
    host: string;
    axios: import("axios").AxiosInstance;
    call(method: any, data: any, config: any): Promise<any>;
    pipe(method: any, options: any): any;
    userGetInfo(): Promise<any>;
    changeAnonymous(a: any): Promise<any>;
    walletGetBalance(symbol: any): Promise<any>;
    diceBet(dir: any, num: any, symbol: any, amount: any, banker?: number): Promise<any>;
    crashBet(multi: any, symbol: any, amount: any, banker?: number): Promise<any>;
}
