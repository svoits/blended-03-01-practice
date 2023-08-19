const express = require("express");
const { createFile, getFiles, getInfo } = require("./files");

const filesRouter = express.Router();

filesRouter.post("/", createFile);
filesRouter.get("/", getFiles);
filesRouter.get("/:fileName", getInfo);

module.exports = filesRouter;
