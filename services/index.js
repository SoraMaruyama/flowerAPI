const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));

module.exports = config => {
  const services = {};

  fs.readdirSync(__dirname).forEach(fileName => {
    if (fileName.indexOf(".") === -1) {
      services[fileName] = require(`${__dirname}/${fileName}`)(
        config[fileName]
      );
    }
  });

  return services;
};
