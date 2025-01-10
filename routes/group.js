const express = require("express");
const labRouter = express.Router();
const labController = require("../controller/group");

labRouter.get("/group", labController.getGroup);
labRouter.get("/group/add", labController.getAddGroup);
labRouter.post("/group/add", labController.postAddGroup);
labRouter.get("/group/delete/:id", labController.getDeleteGroup);
labRouter.get("/group/edit/:id", labController.getEditGroup);
labRouter.post("/group/edit/:id", labController.postEditGroup);

module.exports = labRouter;
