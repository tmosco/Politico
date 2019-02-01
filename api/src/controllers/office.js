const models = require('../models/office');

const officeCreate = (req, res) => {
  const result = models.createOffice(req.body);
  res.status(result.status).json(result);
};
const officeList = (req, res) => {
  const result = models.getAllOffices();
  res.status(result.status).json(result);
};

const officeDetail = (req, res) => {
  const result = models.getOfficeDetail(req.params.officeId);
  res.status(result.status).json(result);
};
module.exports = {
  officeCreate,
  officeList,
  officeDetail,
};
