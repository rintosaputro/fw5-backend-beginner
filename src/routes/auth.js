const user = require('express').Router();

const {
  login, verify, forgotRequest, confirmRegistration,
} = require('../controllers/auth');

user.post('/login', login);
user.post('/verify', verify);
user.post('/forgotPassword', forgotRequest);
user.post('/confrimRegistration', confirmRegistration);

module.exports = user;
