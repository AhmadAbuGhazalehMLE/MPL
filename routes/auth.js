const express = require("express");
const loginRouter = express.Router();
const loginController = require("../controller/auth");

loginRouter.get("/", loginController.getLogin);
loginRouter.post("/", loginController.postLogin);
loginRouter.get("/signout", loginController.getLogout);

module.exports = loginRouter;
