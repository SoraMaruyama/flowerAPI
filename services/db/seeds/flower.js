exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("flower")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("flower").insert([
        {
          name: "rose",
          score: 9,
          imageId: 9,
          url: ""
        },
        {
          name: "tulip",
          score: 30,
          imageId: 7,
          url: ""
        }
      ]);
    });
};

// url: "https://gph.is/2EtiJ4k"
// url: "https://gph.is/2mO6kOp"
