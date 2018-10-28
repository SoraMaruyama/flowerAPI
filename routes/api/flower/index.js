const express = require("express");

const router = express.Router();

module.exports = services => {
  router.post("", (req, res) => {
    const searchApi = "https://api.giphy.com/";
    const getApi = "v1/gifs/search?";
    const apiKey = "&api_key=dc6zaTOxFJmzC";
    const query = `&q=${req.params.flower}`;
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
        imageId: req.body.imageId,
        url: req.body.url
      })
      .then(flower => res.status(201).json(flower.serialize()))
      .catch(err => res.status(400).send(err.message));
  });

  router.get("", (req, res) =>
    services.db.flower
      .list()
      .then(flowers => flowers.map(flower => flower.serialize()))
      .then(flowers => res.status(200).json(flowers))
      .catch(err => res.status(400).send(err.message))
  );

  router.put("", (req, res) =>
    services.db.flower
      .create({
        id: req.params.id,
        score: req.body.score
      })
      .then(scores => scores.map(score => score.serialize()))
      .then(scores => res.status(200).json(scores))
      .catch(err => res.status(400).send(err.message))
  );

  router.delete("", (req, res) =>
    services.db.flower
      .create({
        id: req.params.id,
        score: req.body.score
      })
      .then(scores => scores.map(score => score.serialize()))
      .then(scores => res.status(200).json(scores))
      .catch(err => res.status(400).send(err.message))
  );
  return router;
};
