module.exports = (knex, Flower) => {
  return () => {
    return knex
      .select()
      .from("flower")
      .map(item => new Flower(item));
  };
};
