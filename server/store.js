var shareDbMongo = require('sharedb-mongo');
var coffeeify = require('coffeeify');

module.exports = store;

function store(derby, config) {

  var db = shareDbMongo(process.env.MONGO_URL + '?auto_reconnect', {safe: true});

  derby.use(require('racer-bundle'));

  var store = derby.createStore({db: db});

  store.on('bundle', function(browserify) {

    browserify.transform({global: true}, coffeeify);

    config.prebundle && config.prebundle.forEach(function (lib) {

      browserify.require(config.path.vendors + '/' + lib, {expose: lib})
    });

    var pack = browserify.pack;

    browserify.pack = function (opts) {

      var detectTransform = opts.globalTransform.shift();

      opts.globalTransform.push(detectTransform);

      return pack.apply(this, arguments);
    };
  });

  return store;
}