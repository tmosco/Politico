
let parties = [];
const partyRequiredFields = ['name'];

const createParty = (body) => {
  let isValid = true;
  const keys = Object.keys(body);
  partyRequiredFields.forEach((field) => {
    isValid = isValid && keys.includes(field);
  });
  let result = {};
  if (isValid) {
    const id = parties.length + 1;
    const data = {
      id,
      name: body.name,
      hqAddress: body.hqAddress,
      logoUrl: body.logoUrl,
    };
    parties.push(data);
    result = {
      status: 201,
      data,
    };
  } else {
    const missingKeys = partyRequiredFields.filter(
      key => !Object.keys(body).includes(key),
    );
    result.status = 400;
    result.error = `The ${missingKeys[0]} of the party is missing`;
  } return result;
};
const getAllParties = () => ({ status: 200, data: parties });
const getPartyDetail = (partyId) => {
  let result = {};
  const foundParty = parties.find(
    party => party.id === parseInt(partyId, 10),
  );
  if (foundParty) {
    result = { status: 200, data: foundParty };
  } else {
    result = { status: 404, error: 'Party not found' };
  }
  return result;
};
const editPartyDetail = (partyId, name) => {
  const foundParty = parties.find(party => party.id === parseInt(partyId, 10));
  let result = {};
  if (foundParty) {
    foundParty.name = name;
    parties = parties.map(party => (party.id === parseInt(partyId, 10) ? foundParty : party));
    result = {
      status: 200,
      data: foundParty,
    };
  } else {
    result = { status: 404, error: 'Party not found' };
  }
  return result;
};
const deleteParty = (_partyId) => {
  const partyId = parseInt(_partyId, 10);
  const foundParty = parties.find(party => party.id === partyId);
  let result = {};
  if (foundParty) {
    parties = parties.filter(party => party.id !== partyId);
    result = {
      status: 202,
      data: {
        message: 'Party successfully deleted',
      },
    };
  } else {
    result = {
      status: 404,
      error: 'Party not found',
    };
  }
  return result;
};
module.exports = {
  createParty,
  getAllParties,
  getPartyDetail,
  editPartyDetail,
  deleteParty,
};
