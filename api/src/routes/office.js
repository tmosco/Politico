const express = require('express');
const controllers = require('../controllers/office');

const router = express.Router();


router.post('/', controllers.officeCreate);

router.get('/', controllers.officeList);

router.get('/:officeId', controllers.officeDetail);

module.exports = router;
