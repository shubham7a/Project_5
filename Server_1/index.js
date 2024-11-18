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
  apiSecret: process.env.API_SECRET,
};

// app.post("/webhook", (req, res) => {
//   const webhookBody = req.body;

//   console.error("webhook data:", webhookBody);

//   res.status(200).send("WEBHOOK_RECEIVED");
// });

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


app.post("/webhook", function (request, response) {
  console.log('Incoming Webhook Payload:', JSON.stringify(request.body, null, 2));
  try {
    const entry = request.body?.entry?.[0];
    if (!entry) throw new Error('Entry is missing in the webhook request');

    const changes = entry?.changes?.[0];
    if (!changes) throw new Error('Changes array is missing in the webhook request');

    // Check if the event contains messages
    if (changes?.value?.messages) {
      const contact = changes?.value?.contacts?.[0];
      if (!contact) throw new Error('Contact information is missing in the webhook request');

      const message = changes?.value?.messages?.[0];
      if (!message) throw new Error('Message information is missing in the webhook request');

      const waId = contact?.wa_id;
      const contactName = contact?.profile?.name;
      const messageBody = message?.text?.body||message?.image?.id || message?.reaction?.emoji;
      const messageType = message?.type;
      const phoneNumberId = changes?.value?.metadata?.phone_number_id;
        


      console.log("===========================");
      console.log('Phone Number From:', waId);
      console.log('Contact Name:', contactName);
      console.log('Message Body:', messageBody);
      console.log('Message Type:', messageType);
      console.log('Phone Number ID:', phoneNumberId);

  

      
      const payload = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: waId,
        type: "text",
        text: {
          preview_url: false,
          body: ` Hello ${contactName} ❤️`
        }
        
      };

      
      axios.post(
        `${whatsappCloudApi.baseUrl}/${whatsappCloudApi.phoneNumberId}/messages`,
        payload,
        {
          headers: {
            Authorization: "Bearer EAANHvhSji6cBO1T6w30ZAOCcAlveSRED0UVVu5VHjW0gbw3gP08FuPcOoLVADZBlnhma7JbHBRmxkFHM261WrZBK63oxT0xfxlhlOZBnjqxFH43pZASpTlAwb7KqUlv2Vjk8e1xub1ObpqY0uCk60v4wzMDlEOWe2mZBPrOtbauzBdbjDX6DqfRFvFv8rdsb9efrLI4Bh6tIPVoHAUKLoyoWOVEEaC4R4GCOKRYUI9w3UZD",
            "Content-Type": "application/json",
          },
        }
      )
        .then(response => {
          console.log('Message sent successfully:', response?.data);
        })
        .catch(error => {
          console.error('Error sending message:', error?.response?.data || error.message);
        });

      response.sendStatus(200);
    } else if (changes?.value?.statuses) {
      
      const status = changes?.value?.statuses?.[0];
      if (!status) throw new Error('Status information is missing in the webhook request');

      const messageStatus = status?.status;
      const recipientId = status?.recipient_id;
      const conversationId = status?.conversation?.id;

      
        console.log("===========================");
        console.log('Message Status:', messageStatus);
        console.log('Recipient ID:', recipientId);
        if(messageStatus === 'delivered' )
        console.log('Conversation ID:', conversationId);

      response.sendStatus(200);  
    } else {
      throw new Error('Unknown event type in the webhook request');
    }

  } catch (error) {
    console.error('Error processing webhook:', error.message);
    response.sendStatus(500);  
  }
});


app.post("/send-message", async (req, res) => {
  try {
    const { to, message } = req.body;

    const product={
      messaging_product: "whatsapp",
      to: `91${to}`,
      type: "text",
      text: { body: message },
    }

    // WhatsApp Cloud API request to send message
    const response = await axios.post(
      `${whatsappCloudApi.baseUrl}/${whatsappCloudApi.phoneNumberId}/messages`,
      product,
      {
        headers: {
          Authorization: "Bearer EAANHvhSji6cBO1T6w30ZAOCcAlveSRED0UVVu5VHjW0gbw3gP08FuPcOoLVADZBlnhma7JbHBRmxkFHM261WrZBK63oxT0xfxlhlOZBnjqxFH43pZASpTlAwb7KqUlv2Vjk8e1xub1ObpqY0uCk60v4wzMDlEOWe2mZBPrOtbauzBdbjDX6DqfRFvFv8rdsb9efrLI4Bh6tIPVoHAUKLoyoWOVEEaC4R4GCOKRYUI9w3UZD",
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
    console.log("Response Data:", response.data);
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
