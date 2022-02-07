const users = require('express').Router();

const {
  getUsers, getUser, addUser, editUser, deleteUser,
} = require('../controllers/users');

users.get('/', getUsers);
users.get('/:id', getUser);
users.post('/', addUser);
users.patch('/:id', editUser);
users.delete('/:id', deleteUser);

module.exports = users;
