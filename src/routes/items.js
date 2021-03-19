module.exports = (app) => {
  const controller = require("../controllers/items")();

  app.get("/api/items", controller.getItems);
  app.get("/api/items/:id", controller.getItemDetail);
};
