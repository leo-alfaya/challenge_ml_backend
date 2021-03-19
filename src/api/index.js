const fetch = require("node-fetch");

module.exports = () => {
  const api = {};

  api.get = async (url) => {
    return fetch(url)
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
