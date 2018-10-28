const express = require("express");

const router = express.Router();

const flowerRouter = require("./flower");

module.exports = services => {
  router.use("/flower", flowerRouter(services));

  return router;
};
