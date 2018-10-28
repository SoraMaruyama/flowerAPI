exports.up = function(knex, Promise) {
  return knex.schema.createTable("flower", t => {
    t.increments().index();

    t.string("name", 50)
      .unique()
      .notNullable()
      .index();
    t.integer("score", 100)
      .index()
      .notNullable();
    t.string("imageId", 100)
      .unique()
      .notNullable()
      .index();
    t.string("url", 100)
      .unique()
      .notNullable()
      .index();
    t.timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("flower");
};
