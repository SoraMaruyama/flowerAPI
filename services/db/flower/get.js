module.exports = (knex, Flower) => {
  return params => {
    const name = params.flower;

    return knex("flower")
      .where({ name: name })
      .select()
      .then(flowers => {
        if (flowers.length) return new Flower(flowers.pop());

        throw new Error(`Error finding flower ${name}`);
      });
  };
};
