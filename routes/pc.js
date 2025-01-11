const express = require("express");
const pcRouter = express.Router();
const pcController = require("../controller/pc");

pcRouter.get("/pc/add", pcController.getAddPc);
pcRouter.post("/pc/add", pcController.postAddPc);
pcRouter.get("/pc/delete/:id", pcController.getDeletePc);
pcRouter.get("/pc/edit/:id", pcController.getEditPc);
pcRouter.post("/pc/edit/:id", pcController.postEditPc);
pcRouter.get("/pc/:lId", pcController.getPc);

module.exports = pcRouter;
