const user = require('express').Router();

const { login, verify } = require('../controllers/auth');

user.post('/login', login);
user.post('/verify', verify);

module.exports = user;
