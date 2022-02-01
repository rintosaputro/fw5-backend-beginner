const route = require('express').Router();

route.use('/vehicles', require('./vehicles'));
route.use('/popular', require('./popular'));
route.use('/users', require('./users'));
route.use('/profile', require('./profile'));
route.use('/history', require('./history'));

module.exports = route;
