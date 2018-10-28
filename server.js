const bodyParser = require("body-parser");
const fs = require("fs");
global.fetch = require("node-fetch");
const express = require("express");
const app = express();
const server = app.listen(3000, listening);
app.use(express.static("website"));
function listening() {
  console.log("web server listening...");
}
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const OK = 200;
const FAIL = 400;
const SERVER_ERROR = 500;

const words = {
  sunflower: 1,
  Bonsai: 2,
  Hibiscus: 9
};

app.get("/", (req, res) => {
  res.status(OK).send("welcome!");
});

app.get("/all", showAll);
function showAll(req, res) {
  res.send(words);
}

app.get("/flowers", showFlowers);
function showFlowers(req, res) {
  const flowers = JSON.parse(fs.readFileSync("./flowers.json"));
  res.send(flowers);
}

app.get("/api/:flower", getGiphy);

function getGiphy(req, res) {
  const searchApi = "https://api.giphy.com/";
  const getApi = "v1/gifs/search?";
  const apiKey = "&api_key=dc6zaTOxFJmzC";
  const query = `&q=${req.flower}`;
  const url = searchApi + getApi + apiKey + query;

  return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(myJson => {
      res.send(myJson);
    });
}
function searchWord(req, res) {
  const data = req.params;
  res.send(`please get me some ${data.word}!`);
}

function addWord(req, res) {
  const newWord = req.params.flower;
  const newScore = Number(req.params.score);
  words[newWord] = newScore;
  res.send(words);
}

function getScore(req, res) {
  let reply;
  const data = req.params;
  if (words[data.word]) {
    reply = {
      status: "found",
      word: data.word,
      score: words[data.word]
    };
  } else {
    reply = {
      status: "Not found",
      word: data.word
    };
  }
  res.send(reply);
}

//POST
app.post("/api/po/words", postWord);

function postWord(req, res) {
  const newWord = req.body.word;
  const newScore = req.body.score;
  words[newWord] = newScore;
  res.send(words);
}

//PUT
app.put("/api/pu/words", putWord);

function putWord(req, res) {
  const searchWord = req.body.word;
  const newScore = req.body.score;
  words[searchWord] = newScore;
  res.send(words);
}

//DELETE
app.delete("/api/de/words", deleteWord);

function deleteWord(req, res) {
  const deleteWord = req.body.word;
  words[deleteWord] = null;
  res.send(words);
}

module.exports = app;
