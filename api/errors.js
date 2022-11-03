require("dotenv").config();
import { Router } from "express";
import { sendDeployErrorNotification } from "../slack";
import { createHmac } from "crypto";
const router = Router();

router.post("/", (req, res, next) => {
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
  }
  next();
});
export default router;
