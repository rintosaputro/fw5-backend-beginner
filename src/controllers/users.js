/* eslint-disable camelcase */
const userModel = require('../models/users');

const getUsers = (req, res) => {
  userModel.getUsers((results) => res.json({
    success: true,
    message: 'List users',
    results,
  }));
};

const addUser = (req, res) => {
  const {
    name, display_name, email, phone_number, address, birthdate,
  } = req.body;
  if (name && display_name && email && phone_number && address && birthdate) {
    return userModel.addUser(req.body, () => {
      userModel.getUsers((results) => {
        const newUser = results.length - 1;
        res.json({
          success: true,
          message: 'Successfully added new user',
          user: results[newUser],
        });
      });
    });
  }
  return res.status(400).json({
    success: false,
    message: 'Failed to add new user',
  });
};

const editUser = (req, res) => {
  const { id } = req.params;
  userModel.editUser(req.body, id, (results) => {
    if (results.affectedRows > 0) {
      return res.json({
        success: true,
        message: 'Successfully updated user',
        user: { id_user: id, ...req.body },
      });
    }
    return res.status(400).json({
      success: false,
      message: 'Failed to update user',
    });
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  userModel.deleteUser(id, (results) => {
    if (results.affectedRows > 0) {
      return res.json({
        success: true,
        message: `User with id ${id} successfully deleted`,
      });
    }
    return res.status(400).json({
      success: false,
      message: `Failed to delete user with id ${id}`,
    });
  });
};

module.exports = {
  getUsers,
  addUser,
  editUser,
  deleteUser,
};
