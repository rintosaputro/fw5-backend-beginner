const users = require('express').Router();

const {
  getUsers, getUser, addUser, editUser,
} = require('../controllers/users');

users.get('/', getUsers);
users.get('/:id', getUser);
users.post('/', addUser);
users.patch('/:id', editUser);

module.exports = users;
