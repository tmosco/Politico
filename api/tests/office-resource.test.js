const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/server');

describe('Office resource', () => {
  const url = '/api/v1/offices';
  describe('POST /offices', () => {
    it('when a political office is created', () => {
      const officeDetails = {
        type: 'federal',
        name: 'President',
      };
      request(app)
        .post(url)
        .send(officeDetails)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.deep.equal({
            status: 201,
            data: {
              id: 1,
              name: 'President',
              type: 'federal',
            },
          });
        });
    });
    it('When a second office is created', () => {
      request(app)
        .post(url)
        .send({ type: 'state', name: 'Lagos Governorship Office' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.deep.equal({
            status: 201,
            data: {
              id: 2,
              name: 'Lagos Governorship Office',
              type: 'state',
            },
          });
        });
    });
    it('When creating a party fails', () => {
      request(app).post(url).send({ name: 'Ekiti Governorship Office' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.deep.equal({
            status: 400,
            error: 'The type of the office is missing',
          });
        });
    });
  });
  describe('GET /offices', () => {
    it('returns all the political offices created', () => {
      request(app).get(url).end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.deep.equal({
          status: 200,
          data: [{
            id: 1,
            name: 'President',
            type: 'federal',
          }, {
            id: 2,
            name: 'Lagos Governorship Office',
            type: 'state',
          }],
        });
      });
    });
  });
  describe('GET /offices/1', () => {
    it('returns the office by the id provided in the url', (done) => {
      request(app).get(`${url}/1`).end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.deep.equal({
          status: 200,
          data: {
            id: 1,
            name: 'President',
            type: 'federal',
          },
        });
        done();
      });
    });
    it("returns an error when the id passed in the url doesn't exists", (done) => {
      request(app).get(`${url}/3`).end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.deep.equal({
          status: 404,
          error: 'Office not found',
        });
        done();
      });
    });
  });
});
