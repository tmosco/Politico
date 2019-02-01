const express = require('express');

const middlewares = require('./middlewares');

const partyRoutes = require('./routes/party');
const officeRoutes = require('./routes/office');

const app = express();

app.use(...middlewares); // for parsing application/json

const baseUrl = '/api/v1';
app.use(`${baseUrl}/parties`, partyRoutes);
app.use(`${baseUrl}/offices`, officeRoutes);


app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 3000');
});

module.exports = app;
