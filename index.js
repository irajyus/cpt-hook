require("dotenv").config();
import express, { json } from "express";
const app = express();
import slack from "slack-notify";
import errors from "./api/errors";

app.use(json({ extended: false }));
app.use("/api/errors", errors);
app.listen("api/errors");
