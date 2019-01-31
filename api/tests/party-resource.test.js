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
      request(app)
        .post(url)
        .send(partyDetails)
        .end((err, res) => {
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
    it("when a party wasn't successfully created", (done) => {
      const partyDetail = {
        hqAddress: 'Abuja',
        logoUrl: 'http://www.google.com',
      };
      request(app).post(url).send(partyDetail).end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.deep.equal({
          status: 400,
          error: 'The name of the party is missing',
        });
        done();
      });
    });
  });
 

  describe('DELETE /parties/1', () => {
    it('should delete the party based on the id passed', () => {
      request(app).delete(`${url}/1`).end((err, res) => {
        expect(res.statusCode).to.equal(202);
        expect(res.body).to.deep.equal({
          status: 202,
          data: {
            message: 'Party successfully deleted',
          },
        });
      });
    });
    it('trying to get a deleted party should return 404', () => {
      request(app).delete(`${url}/1`).end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.deep.equal({
          status: 404,
          error: 'Party not found',
        });
      });
    });
    it('trying to deleta a non existent party should throw a 404 not found', () => {
      request(app).delete(`${url}/1`).end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.deep.equal({
          status: 404,
          error: 'Party not found',
        });
      });
    });
  });
});
