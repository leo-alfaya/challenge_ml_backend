const express = require("express");
const config = require("config");

module.exports = () => {
  const app = express();

  // ENVIRONMENT VARIABLES
  app.set("port", process.env.PORT || config.get("server.port"));

  //MIDDLEWARES
  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  //APPLICATION ROUTES
  require("../api/routes/product")(app);

  return app;
};
