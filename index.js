require("dotenv").config();
import express, { json } from "express";
const app = express();
import slack from "slack-notify";
import errors from "./api/errors";

app.use(json({ extended: false }));
app.use("/api/errors", errors);

const port = 5000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
