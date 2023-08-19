const express = require("express");
const logger = require("morgan");
const filesRouter = require("./router");

const app = express();

// const formatsLogger = app.get("env") === "development" ? "dev" : "short";
// app.use(logger(formatsLogger));

app.use(logger("dev"));
app.use(express.json());
app.use("/files", filesRouter);

app.listen(3000, () => {
  console.log("Server running");
});
