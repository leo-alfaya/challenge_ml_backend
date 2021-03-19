module.exports = (app) => {
  const controller = require("../controllers/product")();

  app.get("/api/items", controller.getItems);
  app.get("/api/items/:id", controller.getItemDetail);
};
