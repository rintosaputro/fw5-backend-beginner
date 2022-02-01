const route = require('express').Router();

route.use('/vehicles', require('./vehicles'));
route.use('/popular', require('./popular'));
route.use('/users', require('./users'));

module.exports = route;
