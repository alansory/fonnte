const express = require('express');
const bodyParser = require('body-parser');
const sendMessageRoute = require('./routes/sendMessage');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/api', sendMessageRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
