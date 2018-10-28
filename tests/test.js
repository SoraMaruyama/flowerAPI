const fs = require("fs");
const flowerFile = require("../flowers.json");
const app = require("../server.js");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

describe("GET /api", () => {
  let status;
  let response;

  before(done => {
    chai
      .request(app)
      .get("/")
      .set("Content-Type", "application/json")
      .end((_, res) => {
        status = res.status;
        response = res.text;
        done();
      });
  });

  it("should return status 200.", done => {
    status.should.equal(200);
    done();
  });

  it("should provide a welcome message.", done => {
    response.should.be.a("string");
    done();
  });
});

describe("GET /api/:word", () => {
  let response;
  let responseGiphy;

  before(done => {
    chai
      .request(app)
      .get("/api/:word")
      .set("Content-Type", "application/json")
      .end((_, res) => {
        response = res.text;
        done();
      });
  });

  it("should be a JSON object.", done => {
    response.should.be.a("string");
    response = JSON.parse(response);
    response.should.be.an("object");
    done();
  });
});

describe("POST/PUT Tests", () => {
  const flowerFile = "../flower.json";
  const flowerBackup = `${flowerFile}.bak`;

  beforeEach(() => {
    fs.createReadStream(flowerFile).pipe(fs.createWriteStream(flowerBackup));
  });

  afterEach(() => {
    fs.createReadStream(flowerBackup).pipe(fs.createWriteStream(flowerFile));
    fs.unlinkSync(flowerBackup);
  });

  describe("POST /api/po/words", () => {
    before(done => {
      chai
        .request(app)
        .put("/api/po/words")
        .set("Content-Type", "application/json")
        .send(words)
        .end(() => {
          done();
        });
    });

    after(done => {
      chai
        .request(app)
        .put("/api/po/words")
        .set("Content-Type", "application/json")
        .send(words)
        .end(() => {
          done();
        });
    });

    const appendData = {
      word: "cat",
      score: 100
    };

    it("should add word when post.", done => {
      chai
        .request(app)
        .post("/api/po/words")
        .set("Content-Type", "application/json")
        .send(appendData)
        .end(() => {
          chai
            .request(app)
            .get("/all")
            .set("Content-Type", "application/json")
            .end((error, result) => {
              JSON.parse(result.text)
                .words.pop()
                .should.deep.equal(appendData);
              done();
            });
        });
    });
  });

  describe("PUT /api/pu/words", () => {
    let status;
    let updateData = {
      word: "cat",
      score: 10000
    };

    before(done => {
      chai
        .request(app)
        .put("/api/pu/words")
        .set("Content-Type", "application/json")
        .send(updateData)
        .end((error, result) => {
          JSON.parse(result.text)
            .words.pop()
            .should.deep.equal(updateData);
          done();
        });
    });

    it("should update word.", done => {
      chai
        .request(app)
        .get("/all")
        .set("Content-Type", "application/json")
        .end((_, res) => {
          JSON.parse(res.text).words.should.deep.equal(words);
          done();
        });
    });
  });
});
