const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); 

const version = 'v1';
const PORT = process.env.PORT || 3000
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

app.listen(PORT, () => {
    
    console.log(`Listening on port ${PORT}`);
});

module.exports = app;