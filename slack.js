require("dotenv").config();

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
const slack = require("slack-notify")(SLACK_WEBHOOK_URL);

class Slack {
  static sendDeployErrorNotification = async (event) => {
    await slack.success({
      text: "Build error",
      attachments: [
        {
          fields: [
            { title: "Name", value: event.name, short: true },
            { title: "Inspect", value: event.inspectorUrl, short: true },
          ],
        },
      ],
    });
  };
}
module.exports = Slack;
