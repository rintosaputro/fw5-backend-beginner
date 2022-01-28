const users = require('express').Router();

const { getUsers } = require('../controllers/users');

users.get('/', getUsers);

module.exports = users;
