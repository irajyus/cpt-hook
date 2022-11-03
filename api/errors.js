require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const Slack = require("../slack");
const crypto = require("crypto");
const router = express.Router();

router.post("/", (req, res) => {
  console.log(req.body);
  const production = req.body.payload.target === "production";
  console.log(production);
  const payload = JSON.stringify(req.body);
  console.log(typeof payload);
  const xvs = req.get("x-vercel-signature");
  const signature = crypto
    .createHmac("sha1", process.env.OAUTH2_SECRET)
    .update(payload)
    .digest("hex");
  const { name, inspectorUrl } = req.body.payload.deployment;
  const event = { name, inspectorUrl };
  if (signature === xvs && production) {
    Slack.sendDeployErrorNotification(event);
    // console.log(payload);
    // console.log(xvs);
    return res.json({
      success: true,
      event,
    });
  } else {
    res.status(400).send("Bad Request");
  }
});
module.exports = router;
