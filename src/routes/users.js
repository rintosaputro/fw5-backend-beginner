const users = require('express').Router();

const {
  getUsers, getUser, addUser, editUser, deleteUser,
} = require('../controllers/users');
const { verifyUser } = require('../helpers/auth');

users.get('/', getUsers);
users.get('/:id', getUser);
users.post('/', addUser);
users.patch('/:id', verifyUser, editUser);
users.delete('/:id', verifyUser, deleteUser);

module.exports = users;
