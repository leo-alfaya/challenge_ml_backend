const fetch = require("node-fetch");
const config = require("config");

const handleResponse = (data) => {
  const { status, message } = data

  if(status === 404) {
    return { 
      error: true,
      message: message,
    }
  }

  return {
    error: false,
    data,
  }
}

module.exports = () => {
  const api = {};
  const BASE_URL = config.get("server.mercado-libre-base-url");

  api.get = async (url) => {
    return fetch(`${BASE_URL}${url}`)
      .then((response) => response.json())
      .then((data) => handleResponse(data))
      .catch((error) => ({
        error: true,
        message: error,
      }));
  };

  return api;
};
