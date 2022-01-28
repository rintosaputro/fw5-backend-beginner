const users = require('express').Router();

const { getUsers, getUser } = require('../controllers/users');

users.get('/', getUsers);
users.get('/:id', getUser);

module.exports = users;
