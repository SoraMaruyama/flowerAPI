module.exports = {
  // database connection configs
  db: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      database: "giphy"
    },
    port: 5432
  },

  // port for server to run on
  express: {
    port: 3000
  },

  // timestamp format for our logs
  logger: {
    format: "dddd MMMM Do YYYY, h:mm:ss a"
  }
};
