const users = require('express').Router();

const { getUsers, getUser, addUser } = require('../controllers/users');

users.get('/', getUsers);
users.get('/:id', getUser);
users.post('/', addUser);

module.exports = users;
