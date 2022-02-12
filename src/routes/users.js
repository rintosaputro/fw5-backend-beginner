const users = require('express').Router();

const {
  getUsers, getUser, addUser, editUser, deleteUser,
} = require('../controllers/users');
const { verifyUser } = require('../helpers/auth');

users.get('/', getUsers);
users.post('/registry', addUser);
users.get('/:id', getUser);
users.patch('/:id', verifyUser, editUser);
users.delete('/:id', verifyUser, deleteUser);

module.exports = users;
