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
const baseUrl = `/api/${version}`;
app.post(`${baseUrl}/parties`, (req, res) => {
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
    const missingKeys = requiredFields.filter(
      key => !Object.keys(body).includes(key),
    );
    res.status(400).json({
      status: 400,
      error: `The ${missingKeys[0]} of the party is missing`,
    });
  }
});


app.get(`${baseUrl}/parties`, (req, res) => {
  res.status(200).json({ status: 200, data: parties });
});

app.get(`${baseUrl}/parties/:partyId`, (req, res) => {
  const foundParty = parties.find(
    party => party.id === parseInt(req.params.partyId, 10),
  );
  if (foundParty) {
    res.status(200).json({ status: 200, data: foundParty });
  } else {
    res.status(404).json({ status: 404, error: 'Party not found' });
  }
});


app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 3000');
});

module.exports = app;
