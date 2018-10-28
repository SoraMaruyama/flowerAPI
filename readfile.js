const fs = require("fs");

function gotData(data) {
  console.log(data);
}

function animal() {
  fs.readFile("./animal.json", "utf8", (err, fileContents) => {
    if (err) {
      console.error(err);
      return;
    }
    try {
      const data = JSON.parse(fileContents);
      const animalName = data.map(item => item.name);
      console.log(animalName);
    } catch (err) {
      console.error(err);
    }
  });
}

animal();

function flower() {
  fs.readFile("./flowers.json", "utf8", (err, fileContents) => {
    if (err) {
      console.error(err);
      return;
    }
    try {
      const data = JSON.parse(fileContents);
      const flowerName = data.flowerlist.map(item => item.name);
      console.log(flowerName);
    } catch (err) {
      console.error(err);
    }
  });
}

module.exports = flower;
module.exports = animal;
