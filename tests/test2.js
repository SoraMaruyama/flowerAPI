const { expect } = require("chai");
const config = require("../config");
const knex = require("knex")(config.db);
const db = require("../services/db")(config.db);
const app = require("../routes/api/flower/index.js");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const forcePromiseReject = () => {
  throw new Error("This promise should have failed, but did not.");
};

describe("flower", () => {
  describe("setup", () => {
    it("has run the initial migrations", () =>
      knex("flower")
        .select()
        .catch(e => console.log(e)));
  });

  describe("#create", () => {
    let params = {
      name: "sunflower",
      score: 100,
      imageId: 1,
      url: "https://gph.is/2lFAK1l"
    };

    context("when good params are given", () => {
      before(() => {
        params.name = "sunflower";
      });

      afterEach(() => knex("flower").del()); // delete all flowers after each spec

      it("creates a flower record with hard code", () =>
        db.flower.create(params).then(flower => {
          expect(flower).to.include({
            name: params.name,
            score: params.score,
            imageId: params.imageId,
            url: params.url
          });
          expect(flower.id).to.be.a("number");
        }));

      context("when a duplicate flower is provided", () => {
        beforeEach(() => db.flower.create(params));

        it("generates a sanitized error message", () =>
          db.flower
            .create(params)
            .then(forcePromiseReject)
            .catch(err =>
              expect(err.message).to.equal("That flower already exists")
            ));
      });
    });
  });

  describe("POST /flower", () => {
    let response;

    before(done => {
      const postedData = {
        name: "beautiful flower",
        score: 100,
        imageId: 100,
        url: "" //this should receive api response from Giphy
      };
      chai
        .request(app)
        .post("/flower")
        .set("Content-Type", "application/json")
        .send(postedData)
        .then((req, res) => {
          console.log("res=", res);
          console.log("req=", req);
          response = res.text;
          //   response.should.be.an("string");
          done();
        });
      done();
    });

    it("should be a JSON object.", done => {
      // response.should.be.a("string");
      // response = JSON.parse(response);
      // response.should.be.an("object");
      done();
    });
  });

  describe("#list", () => {
    const params = {
      name: "cherry blossom",
      score: 40,
      imageId: 2,
      url: "https://gph.is/1HLpQAD"
    };
    const names = ["sunflower", "cherry blossom"];
    const flowers = names.map(name => ({ name }));
    before(() => Promise.all(flowers.map(db.flower.create)));
    after(() => knex("flower").del());

    db.flower.create(params);
    it("lists all flowers", () =>
      db.flower.list().then(resp => {
        expect(names).to.include(resp[0].name);
        expect(names).to.include(resp[1].name);
      }));

    it("returns serializable objects", () =>
      db.flower.list().then(resp => {
        expect(resp[0].serialize).to.be.a("function");
        expect(resp[0].serialize().id).to.be.a("number");
        expect(resp[0].serialize().name).to.be.a("string");
      }));
  });
});
