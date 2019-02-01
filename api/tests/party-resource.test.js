const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/server');

describe('Political party resource', () => {
  const url = '/api/v1/parties';
  describe('POST /parties', () => {
    it('when a party is successfully created', (done) => {
      const partyDetails = {
        name: 'PDP',
        hqAddress: 'Abuja',
        logoUrl: 'http://www.google.com',
      };
      request(app).post(url).send(partyDetails).end((err, res) => {
          expect(res.statusCode).to.equal(201);
          const { body } = res;
          expect(body).to.deep.equal({
            status: 201,
            data: {
              id: 1,
              name: 'PDP',
              hqAddress: 'Abuja',
              logoUrl: 'http://www.google.com',
            },
          });
          done();
        });
    });
    it('When a second party is added', (done) => {
      request(app)
        .post(url)
        .send({ name: 'APC', hqAddress: 'Lagos', logoUrl: 'http://facebook.com' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          const { body } = res;
          expect(body).to.deep.equal({
            status: 201,
            data: {
              id: 2,
              name: 'APC',
              hqAddress: 'Lagos',
              logoUrl: 'http://facebook.com',
            },
          });
          done();
        });
    });
   
  });
  describe('GET /parties', () => {
    it('returns all the political parties created', (done) => {
      request(app).get(url).end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.deep.equal({
          status: 200,
          data: [{
            id: 1,
            name: 'PDP',
            hqAddress: 'Abuja',
            logoUrl: 'http://www.google.com',
          },
          {
            id: 2, name: 'APC', hqAddress: 'Lagos', logoUrl: 'http://facebook.com',
          },
          ],
        });
        done();
      });
    });
  });
});
