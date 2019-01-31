/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
const { expect } = require("chai");
const request = require("supertest");
const app = require("../src/server");

describe("Political party resource", function() {
  const url = "/api/v1/parties";
  describe("POST /parties", function() {
    it("when a party is successfully created", function(done) {
      const partyDetails = {
        name: "PDP",
        hqAddress: "Abuja",
        logoUrl: "http://www.google.com"
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
              name: "PDP",
              hqAddress: "Abuja",
              logoUrl: "http://www.google.com"
            }
          });
          done();
        });
    });
    it("When a second party is added", function(done) {
      request(app)
        .post(url)
        .send({
          name: "APC",
          hqAddress: "Lagos",
          logoUrl: "http://facebook.com"
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          const { body } = res;
          expect(body).to.deep.equal({
            status: 201,
            data: {
              id: 2,
              name: "APC",
              hqAddress: "Lagos",
              logoUrl: "http://facebook.com"
            }
          });
          done();
        });
    });
    it("when a party wasn't successfully created", function(done) {
      const partyDetail = {
        hqAddress: "Abuja",
        logoUrl: "http://www.google.com"
      };
      request(app)
        .post(url)
        .send(partyDetail)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.deep.equal({
            status: 400,
            error: "The name of the party is missing"
          });
          done();
        });
    });
  });
  describe("GET /parties", function() {
    it("returns all the political parties created", function(done) {
      request(app)
        .get(url)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.deep.equal({
            status: 200,
            data: [
              {
                id: 1,
                name: "PDP",
                hqAddress: "Abuja",
                logoUrl: "http://www.google.com"
              },
              {
                id: 2,
                name: "APC",
                hqAddress: "Lagos",
                logoUrl: "http://facebook.com"
              }
            ]
          });
          done();
        });
    });
  });
});
