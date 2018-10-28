module.exports = {
  client: "pg",
  connection: {
    host: "127.0.0.1",
    database: "giphy"
  },
  port: 5432,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: "knex_migrations"
  }
};
