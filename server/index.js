const express = require('express');
const bodyParser = require('body-parser');

const app = express();

global.data = ["arr"];

app.use(express.static('static'));

const cards = require('./routes/cards.js');
app.use('/api/cards', cards);

app.listen(8000);