require("dotenv").config();
import express from "express";
import errors from "./api/errors";
import bodyParser from "body-parser";
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/errors", errors);
app.listen("/api/errors");
