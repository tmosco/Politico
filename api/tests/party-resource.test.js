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
  describe('GET /parties/1', () => {
    it('returns the party by the id provided in the url', (done) => {
      request(app).get(`${url}/1`).end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.deep.equal({
          status: 200,
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
    it("returns an error when the id passed in the url doesn't exists", (done) => {
      request(app).get(`${url}/3`).end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.deep.equal({
          status: 404,
          error: 'Party not found',
        });
        done();
      });
    });
  });
  describe('PATCH /parties/2/name', () => {
    it('should change the name of the party', () => {
      request(app).patch(`${url}/2/AD`).end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.deep.equal({
          status: 200,
          data: {
            id: 2,
            name: 'AD',
            hqAddress: 'Lagos',
            logoUrl: 'http://facebook.com',
          },
        });
      });
    });
    it("should return an error when the party id doesn't exists", () => {
      request(app).patch(`${url}/3/ANPP`).end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.deep.equal({
          status: 404,
          error: 'Party not found',
        });
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
