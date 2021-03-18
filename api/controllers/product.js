module.exports = () => {
  const controller = {};

  controller.getProducts = (req, res) =>
    res.status(200).json({ products: [{ a: "a" }, { b: "b" }] });

  return controller;
};
