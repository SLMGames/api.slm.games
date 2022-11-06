import axios from "axios";
import jsonpipe from "jsonpipe";
global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

export default class api {
  constructor(host = "https://api.slm.games", token) {
    this.token = token;
    this.host = host;
    this.axios = axios.create({
      baseURL: host,
      headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    this.axios.interceptors.request.use((config) => {
      const token = this.token;
      if (token) {
        config.headers["X-Token"] = token;
      }
      delete config.headers["X-Requested-With"];
      return config;
    });
  }

  async call(method, data, config) {
    try {
      let rsp = await this.axios.post(
        `v1/gw/rpc?method=${encodeURIComponent(method)}`,
        data,
        config
      );
      if (rsp.data.error) {
        throw rsp.data;
      }
      return rsp.data.Data;
    } catch (e) {
      throw {
        method: method,
        status: e.response?.status,
        data: e.response?.data,
      };
    }
  }

  pipe(method, options) {
    const url = `${this.host}/v1/gw/stream?method=${encodeURIComponent(
      method
    )}`;
    const config = Object.assign(
      {
        delimiter: "\n",
        method: "POST",
        headers: {},
        withCredentials: false,
      },
      options
    );

    const token = this.token;
    if (token) {
      config.headers["X-Token"] = token;
    }

    if (typeof config.data === "object") {
      config.data = JSON.stringify(config.data);
    }

    return jsonpipe.flow(url, config);
  }

  async userGetInfo() {
    return await this.call("User.GetInfo", {});
  }

  async changeAnonymous(a) {
    const s = {
      true: 1,
      false: 2,
    };
    return await this.call("User.ChangeAnonymous", {
      Anonymous: s[a],
    });
  }

  async walletGetBalance(symbol) {
    const rsp = await this.call("Wallet.PageBalances", {
      PageIndex: 1,
      PageSize: 1,
      Query: `{"Symbol": "${symbol}"}`,
    });
    const balance = rsp.Data;
    if (balance.length) {
      return balance[0];
    }
    return {};
  }

  async diceBet(dir, num, symbol, amount, banker = 1) {
    const dirs = {
      under: 1,
      over: 2,
    };
    return await this.call("Dice.Bet", {
      Dir: dirs[dir],
      Number: num,
      Symbol: symbol,
      Amount: amount,
      BankerNftID: banker,
    });
  }

  async crashBet(multi, symbol, amount, banker = 940) {
    return await this.call("Crash.Bet", {
      Multiplier: multi,
      Symbol: symbol,
      Amount: amount,
      BankerNftID: banker,
    });
  }
}
