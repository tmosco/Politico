const express = require('express');
const controllers = require('../controllers/party');

const router = express.Router();


router.post('/', controllers.partyCreate);

router.get('/', controllers.partyList);

router.get('/:partyId', controllers.partyDetail);

router.patch('/:partyId/:name', controllers.partyEdit);

router.delete('/:partyId', controllers.partyDelete);


module.exports = router;
