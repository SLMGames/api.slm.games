const axios = require("axios");
const jsonpipe = require("jsonpipe");

export default class api {
  constructor(host = "https://api.slm.games", token) {
    this.token = token;
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
        status: e.response.status,
        data: e.response.data,
      };
    }
  }

  pipe(method, options) {
    const url = `${
      request.defaults.baseURL
    }v1/gw/stream?method=${encodeURIComponent(method)}`;
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
}
