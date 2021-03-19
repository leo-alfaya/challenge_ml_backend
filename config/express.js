const express = require("express");
const config = require("config");
var cors = require('cors');

module.exports = () => {
  const app = express();

  // ENVIRONMENT VARIABLES
  app.set("port", process.env.PORT || config.get("server.port"));

  //MIDDLEWARES
  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use(cors());

  //APPLICATION ROUTES
  require("../src/routes/items")(app);

  return app;
};
