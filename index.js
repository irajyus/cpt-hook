require("dotenv").config();
const express = require("express");
const app = express();
const errors = require("./api/errors");

app.use(express.json({ extended: false }));
app.use("/api/errors", errors);

const port = 5000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
