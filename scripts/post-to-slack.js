#!/usr/bin/env node

const https = require("https");

// Read from environment or .env
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

if (!SLACK_WEBHOOK_URL) {
  console.error("Error: SLACK_WEBHOOK_URL environment variable not set");
  process.exit(1);
}

const dashboardUrl = process.env.DASHBOARD_URL || "https://phil.github.io/projects-dashboard/";

const payload = {
  text: "📊 Your projects dashboard is ready",
  blocks: [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "📊 Projects Dashboard Updated",
        emoji: true,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Your project dashboard has been updated with the latest status. Check it out to see what's happening across all your projects.",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*<${dashboardUrl}|View Dashboard →>*`,
      },
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `Updated at ${new Date().toLocaleString()}`,
        },
      ],
    },
  ],
};

function postToSlack() {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);

    const options = {
      hostname: new URL(SLACK_WEBHOOK_URL).hostname,
      path: new URL(SLACK_WEBHOOK_URL).pathname,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data),
      },
    };

    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        if (res.statusCode === 200) {
          console.log("✓ Posted to Slack successfully");
          resolve();
        } else {
          console.error(`Slack API error: ${res.statusCode} ${body}`);
          reject(new Error(`Slack API error: ${res.statusCode}`));
        }
      });
    });

    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

postToSlack().catch((err) => {
  console.error("Error posting to Slack:", err.message);
  process.exit(1);
});
