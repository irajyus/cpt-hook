require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.post("/api/errors", (req, res) => {
  console.log("Received Error:", req.body);
  res.sendStatus(200);
});
app.listen("/");
