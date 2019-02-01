
const offices = [];
const officesRequiredFields = ['name', 'type'];

const createOffice = (body) => {
  let isValid = true;
  const keys = Object.keys(body);
  let result = {};
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
    result = {
      status,
      data,
    };
  } else {
    const missingKeys = officesRequiredFields.filter(
      key => !Object.keys(body).includes(key),
    );
    result = {
      status: 400,
      error: `The ${missingKeys[0]} of the office is missing`,
    };
  }
  return result;
};
const getAllOffices = () => ({ status: 200, data: offices });
const getOfficeDetail = (officeId) => {
  let result = {};
  const foundOffice = offices.find(
    office => office.id === parseInt(officeId, 10),
  );
  if (foundOffice) {
    result = { status: 200, data: foundOffice };
  } else {
    result = { status: 404, error: 'Office not found' };
  }
  return result;
};
module.exports = {

  createOffice,
  getAllOffices,
  getOfficeDetail,
};
