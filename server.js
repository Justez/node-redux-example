const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/ping', (req, res) => {
  res.send({ express: 'pong' });
});

app.get('/api/person/:input', (req, res) => {
  res.send({
    val1: '3',
    val2: '5',
  });
});

app.get('/api/facility/:val1', (req, res) => {
  res.send({
    val3: '2',
    val4: '4',
  });
});

app.get('/api/exposure/:val2', (req, res) => {
  res.send({
    val5: '7',
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));