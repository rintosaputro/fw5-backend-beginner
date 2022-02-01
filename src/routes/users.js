const users = require('express').Router();

const {
  getUsers, addUser, editUser, deleteUser,
} = require('../controllers/users');

users.get('/', getUsers);
users.post('/', addUser);
users.patch('/:id', editUser);
users.delete('/:id', deleteUser);

module.exports = users;
