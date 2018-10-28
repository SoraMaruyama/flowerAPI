/* eslint-disable */
const moment = require("moment");

module.exports = config => {
  const format = config.format;

  return {
    log() {
      const time = [`${moment().format(format)}:: `];
      console.log.apply(
        null,
        time.concat(Array.prototype.slice.call(arguments))
      );
    }
  };
};
