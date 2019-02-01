const models = require('../models/party');

const partyCreate = (req, res) => {
  const result = models.createParty(req.body);
  res.status(result.status).json(result);
};

const partyList = (req, res) => {
  const result = models.getAllParties();
  res.status(result.status).json(result);
};

const partyDetail = (req, res) => {
  const result = models.getPartyDetail(req.params.partyId);
  res.status(result.status).json(result);
};

const partyEdit = (req, res) => {
  const { partyId, name } = req.params;
  const result = models.editPartyDetail(partyId, name);
  res.status(result.status).json(result);
};

const partyDelete = (req, res) => {
  const result = models.deleteParty(req.params.partyId);
  res.status(result.status).json(result);
};


module.exports = {
  partyCreate,
  partyList,
  partyDetail,
  partyEdit,
  partyDelete,

};
