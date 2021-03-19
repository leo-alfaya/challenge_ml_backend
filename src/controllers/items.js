const api = require("../api")();
const itemHelpers = require("../helpers/items")();

module.exports = () => {
  const controller = {};

  controller.getItems = async (req, res) => {
    const { q } = req.query;

    const items = await api.get(`/sites/MLA/search?q=${q}`);

    if (!items.error) {
      const preparedItems = itemHelpers.prepareItems(items.data);

      res.status(200).json({ data: preparedItems });
    } else {
      res.status(502).json({ error: items.message });
    }

    return res;
  };

  controller.getItemDetail = async (req, res) => {
    const { id } = req.params;

    const itemDetail = await api.get(`/items/${id}`);
    const itemDescription = await api.get(`/items/${id}/description`);

    if (!itemDetail.error && !itemDescription.error) {
      const preparedItem = itemHelpers.prepareItemDetail(
        itemDetail.data,
        itemDescription.data
      );

      res.status(200).json({
        data: { ...preparedItem },
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
