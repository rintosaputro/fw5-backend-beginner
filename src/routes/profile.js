const profile = require('express').Router();

const profileUser = require('../controllers/profile');
const { verifyUser } = require('../helpers/auth');

profile.get('/', verifyUser, profileUser.getProfile);

module.exports = profile;
