const api = require("../api")();

module.exports = () => {
  const controller = {};
  const BASE_URL = "https://api.mercadolibre.com";

  controller.getItems = async (req, res) => {
    const { q } = req.query;

    const items = await api.get(`${BASE_URL}/sites/MLA/search?q=${q}`);

    if (!items.error) {
      res.status(200).json({ data: items.data });
    } else {
      res.status(502).json({ error: items.message });
    }

    return res;
  };

  controller.getItemDetail = async (req, res) => {
    const { id } = req.params;

    const itemDetail = await api.get(`${BASE_URL}/items/${id}`);
    const itemDescription = await api.get(`${BASE_URL}/items/${id}/description`);    

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
