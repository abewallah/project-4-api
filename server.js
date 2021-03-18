const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Bring In models
require('./models');

// Bring In Routes
const routes = require('./routes')

// Middleware

app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => {
  res.send('Test');
});


app.use('/users', routes.users);
app.use('/auth', routes.auth);
app.use('/messages', routes.messages);
app.use('/chatrooms', routes.chatrooms);

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
