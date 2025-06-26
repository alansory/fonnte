const express = require('express');
const router = express.Router();

router.post('/send-message', async (req, res) => {
  console.log('✅ Received request to send message');
  console.log('📦 Request body:', req.body);

  try {
    const { target, message, countryCode } = req.body;

    const bodyData = {
      target: target || '08123456789',
      message: message || 'Default message',
    };

    if (countryCode) bodyData.countryCode = countryCode;

    console.log('🛠️ JSON body to send:', bodyData);

    const response = await fetch('https://api.fonnte.com/send', {
      method: 'POST',
      headers: {
        'Authorization': 'WVKWLNxXn6mzZhaf4hG6', // Ganti token asli
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    });

    const responseData = await response.json(); // <= gunakan .json()

    console.log('📩 Fonnte API response status:', response.status);
    console.log('📩 Fonnte API response body:', responseData);

    if (!response.ok) {
      console.error('❌ Fonnte API responded with error status');
      return res.status(response.status).send({ error: 'Failed to send message', detail: responseData });
    }

    console.log('✅ Message sent successfully!');
    res.send(responseData); // kirim JSON response ke client
  } catch (error) {
    console.error('💥 Send message error:', error.message);
    res.status(500).send({ error: 'Internal server error while sending message' });
  }
});

module.exports = router;
