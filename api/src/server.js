const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.get('/', (req, res) => {
  res.send('Hello World');
});

const version = 'v1';
const offices = [];
const officesRequiredFields = ['name', 'type'];
const baseUrl = `/api/${version}`;

app.post(`${baseUrl}/offices`, (req, res) => {
  const { body } = req;
  let isValid = true;
  const keys = Object.keys(body);
  officesRequiredFields.forEach((field) => {
    isValid = isValid && keys.includes(field);
  });
  if (isValid) {
    const id = offices.length + 1;
    const data = {
      id,
      name: body.name,
      type: body.type,
    };
    offices.push(data);
    const status = 201;
    res.status(status).json({
      status,
      data,
    });
  } else {
    const missingKeys = officesRequiredFields.filter(
      key => !Object.keys(body).includes(key),
    );
    res.status(400).json({
      status: 400,
      error: `The ${missingKeys[0]} of the office is missing`,
    });
  }
});

app.get(`${baseUrl}/offices`, (req, res) => {
  res.status(200).json({ status: 200, data: offices });
});

app.listen(3000, () => {

  console.log('Listening on port 3000');
});

module.exports = app;
