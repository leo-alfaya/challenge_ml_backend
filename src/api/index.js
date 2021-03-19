const fetch = require("node-fetch");
const config = require("config");

module.exports = () => {
  const api = {};
  const BASE_URL = config.get("server.mercado-libre-base-url");

  api.get = async (url) => {
    return fetch(`${BASE_URL}${url}`)
      .then((response) => response.json())
      .then((data) => ({
        error: false,
        data,
      }))
      .catch((error) => ({
        error: true,
        message: error,
      }));
  };

  return api;
};
