const user = require('express').Router();

const { login, verify, forgotRequest } = require('../controllers/auth');

user.post('/login', login);
user.post('/verify', verify);
user.post('/forgotPassword', forgotRequest);

module.exports = user;
