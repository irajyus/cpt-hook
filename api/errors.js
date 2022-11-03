require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const Slack = require("../slack");
const crypto = require("crypto");
const router = express.Router();

const port = 5000;

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post("/", (req, res) => {
  console.log(req.body);
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
module.exports = router;
