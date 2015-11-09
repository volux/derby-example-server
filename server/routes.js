var express = require('express');
var router = express.Router();

module.exports = function (routes) {

  routes = routes || [];

  routes.forEach(function (route) {

    router[route.method](route.path, route.cb);
  });

  return router;
};