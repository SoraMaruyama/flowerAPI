module.exports = knex => {
  return reqest => {
    const name = reqest.body.name;

    return knex("flower")
      .where({ name: name })
      .select()
      .then(flower => {
        if (flower) return (flower.name = null);
      });
    throw new Error(`Error finding flower ${name}`);
  };
};
