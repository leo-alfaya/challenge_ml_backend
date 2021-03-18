module.exports = (app) => {
  const controller = require("../controllers/product")();

  app.route("/api/v1/products").get(controller.getProducts);
};
