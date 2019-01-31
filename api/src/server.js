const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.get('/', (req, res) => {
  res.send('Hello World');
});

const version = 'v1';

const parties = [];
const requiredFields = ['name'];

app.post(`/api/${version}/parties`, (req, res) => {
  const { body } = req;
  let isValid = true;
  const keys = Object.keys(body);
  requiredFields.forEach((field) => {
    isValid = isValid && keys.includes(field);
  });
  if (isValid) {
    const id = parties.length + 1;
    const data = {
      id,
      name: body.name,
      hqAddress: body.hqAddress,
      logoUrl: body.logoUrl,
    };
    parties.push(data);
    const status = 201;
    res.status(status).json({
      status,
      data,
    });
  } else {
    const missingKeys = requiredFields.filter(key => !Object.keys(body).includes(key));
    res.status(400).json({
      status: 400,
      data: `The ${missingKeys[0]} of the party is missing`,
    });
  }
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 3000');
});

module.exports = app;
