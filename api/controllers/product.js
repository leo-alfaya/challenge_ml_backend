const fetch = require("node-fetch");

module.exports = () => {
  const controller = {};
  const BASE_URL = "https://api.mercadolibre.com";

  async function fetchItems({ query }) {
    return fetch(`${BASE_URL}/sites/MLA/search?q=${query}`)
      .then((response) => response.json())
      .then((data) => ({
        error: false,
        data,
      }))
      .catch((error) => ({
        error: true,
        message: error,
      }));
  }

  async function fetchItemDetail({ id }) {
    return fetch(`${BASE_URL}/items/${id}`)
      .then((response) => response.json())
      .then((data) => ({
        error: false,
        data,
      }))
      .catch((error) => ({
        error: true,
        message: error,
      }));
  }

  async function fetchItemDescription({ id }) {
    return fetch(`${BASE_URL}/items/${id}/description`)
      .then((response) => response.json())
      .then((data) => ({
        error: false,
        data,
      }))
      .catch((error) => ({
        error: true,
        message: error,
      }));
  }

  controller.getItems = async (req, res) => {
    const { q } = req.query;

    const items = await fetchItems({ query: q });

    if (!items.error) {
      res.status(200).json({ data: items.data });
    } else {
      res.status(502).json({ error: items.message });
    }

    return res;
  };

  controller.getItemDetail = async (req, res) => {
    const { id } = req.params;

    const itemDetail = await fetchItemDetail({ id });
    const itemDescription = await fetchItemDescription({ id });

    if (!itemDetail.error && !itemDescription.error) {
      res.status(200).json({
        data: {
          itemDetail: itemDetail.data,
          itemDescription: itemDescription.data,
        },
      });
    } else {
      res
        .status(502)
        .json({ error: itemDetail.message || itemDescription.message });
    }

    return res;
  };

  return controller;
};
