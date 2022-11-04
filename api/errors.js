require("dotenv").config();
import { sendDeployErrorNotification } from "../slack";
import { createHmac } from "crypto";
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  console.log(req.body);
  const production = req.body.payload.target === "production";
  const payload = JSON.stringify(req.body);
  const xvs = req.get("x-vercel-signature");
  const signature = createHmac("sha1", process.env.OAUTH2_SECRET)
    .update(payload)
    .digest("hex");
  const { name, inspectorUrl } = req.body.payload.deployment;
  const event = { name, inspectorUrl };
  if (signature === xvs && production) {
    sendDeployErrorNotification(event);
    return res.json({
      success: true,
      event,
    });
  } else {
    res.end();
  }
});
export default router;
