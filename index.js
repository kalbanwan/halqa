const express = require("express");
const app = express();
app.use(express.json());

const VERIFY_TOKEN = "MySecretToken2025!";

app.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Verified webhook");
    res.status(200).send(challenge);
  } else {
    console.log("❌ Failed verification");
    res.sendStatus(403);
  }
});

app.post("/", (req, res) => {
  console.log("📩 Webhook event received:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));