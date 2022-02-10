const userLogin = require('express').Router();

const { login } = require('../controllers/auth');

userLogin.post('/login', login);

module.exports = userLogin;
