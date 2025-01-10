const express = require("express");
const labRouter = express.Router();
const labController = require("../controller/lab");

labRouter.get("/lab/add", labController.getAddLab);
labRouter.post("/lab/add", labController.postAddLab);
labRouter.get("/lab/delete/:id", labController.getDeleteLab);
labRouter.get("/lab/edit/:id", labController.getEditLab);
labRouter.post("/lab/edit/:id", labController.postEditLab);
labRouter.get("/lab/:gId", labController.getLab);

module.exports = labRouter;
