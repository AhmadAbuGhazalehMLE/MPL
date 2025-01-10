const express = require("express");
const errorRouter = express.Router();
const errorController = require("../controller/error");

errorRouter.all("*", errorController.allError);

module.exports = errorRouter;
