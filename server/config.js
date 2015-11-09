// Config

module.exports = function (options) {

  for (var key in options) if (options.hasOwnProperty(key)) {

    process.env[key] = process.env[key] || options[key];
  }

  process.env['MONGO_URL'] = process.env['MONGOLAB_URI'] || process.env['MONGO_URL']

};
