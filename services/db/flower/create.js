module.exports = (knex, Flower) => {
  return params => {
    const name = params.name;
    const score = params.score;
    const imageId = params.imageId;
    const url = params.url;

    return knex("flower")
      .insert({ name: name, score: score, imageId: imageId, url: url })
      .then(() => {
        return knex("flower")
          .where({ name: name })
          .select();
      })
      .then(flowers => new Flower(flowers.pop()))
      .catch(err => {
        // sanitize known errors
        if (err.message.match("duplicate key value"))
          throw new Error("That flower already exists");

        // throw unknown errors
        throw err;
      });
  };
};
