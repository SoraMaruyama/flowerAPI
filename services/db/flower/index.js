const moment = require("moment");

const Flower = function(dbFlower) {
  this.id = dbFlower.id;
  this.name = dbFlower.name;
  this.score = dbFlower.score;
  this.imageId = dbFlower.imageId;
  this.url = dbFlower.url;
  this.createdAt = new Date(dbFlower.created_at);
};

Flower.prototype.serialize = function() {
  return {
    id: this.id,
    name: this.name,
    score: this.score,
    imageId: this.imageId,
    url: this.url,
    createdAt: moment(this.createdAt).format("hh:mm:ss")
  };
};

module.exports = knex => {
  return {
    create: require("./create")(knex, Flower),
    delete: require("./delete")(knex, Flower),
    update: require("./update")(knex, Flower),
    list: require("./list")(knex, Flower),
    get: require("./get")(knex, Flower)
  };
};
