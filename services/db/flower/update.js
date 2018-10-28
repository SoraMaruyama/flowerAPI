module.exports = knex => {
  return reqest => {
    const name = reqest.body.name;
    const score = reqest.body.score;

    return knex("flower")
      .where({ name: name })
      .select()
      .then(flower => {
        if (flower) return (flower.score = score);
      });
    throw new Error(`Error finding flower ${name}`);
  };
};
