require("dotenv").config();
const express = require("express");
const Slack = require("../slack");
const crypto = require("crypto");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  const production = req.body.payload.target === "production";
  const payload = JSON.stringify(req.body);
  const xvs = req.get("x-vercel-signature");
  const signature = crypto
    .createHmac("sha1", process.env.OAUTH2_SECRET)
    .update(payload)
    .digest("hex");
  const { name, inspectorUrl } = req.body.payload.deployment;
  const event = { name, inspectorUrl };
  if (signature === xvs && production) {
    Slack.sendDeployErrorNotification(event);
    return res.json({
      success: true,
      event,
    });
  } else {
    res.end();
  }
});
module.exports = router;
