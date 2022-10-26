require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const Slack = require("./slack");
const crypto = require("crypto");

const port = 5000;

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/", (req, res) => {
  const payload = JSON.stringify(req.body);
  console.log(typeof payload);
  const xvs = req.get("x-vercel-signature");
  const signature = crypto
    .createHmac("sha1", process.env.OAUTH2_SECRET)
    .update(payload)
    .digest("hex");
  const { name, inspectorUrl } = req.body.payload.deployment;
  const event = { name, inspectorUrl };
  if (signature === xvs) {
    Slack.sendDeployErrorNotification(event);
    // console.log(payload);
    // console.log(xvs);
    return res.json({
      success: true,
      event,
    });
  }
  // res.status(200).send("Success");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
