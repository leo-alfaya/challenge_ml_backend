const express = require("express");
const config = require("config");

module.exports = () => {
  const app = express();

  // ENVIRONMENT VARIABLES
  app.set("port", process.env.PORT || config.get("server.port"));

  //APPLICATION ROUTES
  require("../api/routes/product")(app);

  return app;
};
