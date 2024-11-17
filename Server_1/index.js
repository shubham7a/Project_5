const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

require("dotenv").config();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

const whatsappCloudApi = {   
  baseUrl: process.env.BASE_URL,
  phoneNumberId: process.env.PHONE_NUMBER,
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
};

app.post("/webhook", (req, res) => {
  const webhookBody = req.body;

  console.error("webhook data:", webhookBody);

  res.status(200).send("WEBHOOK_RECEIVED");
});

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === "token") {
    res.status(200).send(challenge);
  } else {
    res.status(403).send("Failed validation");
  }
});



app.post("/send-message", async (req, res) => {
  try {
    const { to, message } = req.body;

    // WhatsApp Cloud API request to send message
    const response = await axios.post(
      `${whatsappCloudApi.baseUrl}/${whatsappCloudApi.phoneNumberId}/messages`,
      {
        messaging_product: "whatsapp",
        to: `91${to}`,
        type: "text",
        text: { body: message },
      },
      {
        headers: {
          Authorization: `Bearer ${whatsappCloudApi.apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
    //console.log("Response Data:", response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
