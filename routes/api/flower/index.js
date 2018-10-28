const express = require("express");
const app = express();
const router = express.Router();
const flowerpowerserver = app.listen(4000, listening);
app.use(express.static("public"));
function listening() {
  console.log("flower power web server...");
}

module.exports = services => {
  //Post >> Create
  router.post("/", (req, res) => {
    const searchApi = "https://api.giphy.com/";
    const getApi = "v1/gifs/search?";
    const apiKey = "&api_key=dc6zaTOxFJmzC";
    const query = `&q=${req.body.name}`;
    const url = searchApi + getApi + apiKey + query;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        console.log("myJson.data[0].url", myJson.data[0].url);
        req.body.url = myJson.data[0].url;
      });

    services.db.flower
      .create({
        name: req.body.name,
        score: req.body.score,
        imageId: req.body.score,
        url: req.body.url
      })
      .then(flower => res.status(201).json(flower.serialize()))
      .catch(err => res.status(400).send(err.message));
  });

  //Get >> Read
  router.get("/", (req, res) =>
    services.db.flower
      .list()
      .then(flowers => flowers.map(flower => flower.serialize()))
      .then(flowers => res.status(200).json(flowers))
      .catch(err => res.status(400).send(err.message))
  );
  //Put >> Update
  router.put("/", (req, res) =>
    services.db.flower
      .update({
        name: req.body.name,
        score: req.body.score
      })
      .then(scores => scores.map(score => score.serialize()))
      .then(scores => res.status(200).json(scores))
      .catch(err => res.status(400).send(err.message))
  );
  //Delete >> Delete
  router.delete("/", (req, res) =>
    services.db.flower
      .delete({
        name: req.body.name
      })
      .then(scores => scores.map(score => score.serialize()))
      .then(scores => res.status(200).json(scores))
      .catch(err => res.status(400).send(err.message))
  );
  return router;
};
