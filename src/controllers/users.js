/* eslint-disable camelcase */
const userModel = require('../models/users');
const helperGet = require('../helpers/get');

const getUsers = (req, res) => {
  helperGet(req, res, userModel.getUsers, userModel.countUsers, 'users');
};

const addUser = (req, res) => {
  const {
    name, display_name, gender, email, phone_number, address, birthdate,
  } = req.body;
  const data = {
    name, display_name, gender, email, phone_number, address, birthdate,
  };
  if (gender.toLowerCase() === 'male' || gender.toLowerCase() === 'female') {
    if (name && display_name && email && phone_number && address && birthdate) {
      const notNumber = /\D/g;
      if (!notNumber.test(phone_number) && (phone_number[0] === '0' || phone_number[0] === '+')) {
        const polaEmail = /@/g;
        if (polaEmail.test(email)) {
          return userModel.checkUser(data, (checkResult) => {
            if (checkResult.length > 0) {
              return res.status(400).json({
                success: false,
                message: 'Failed to add new user. Data already exists',
              });
            }
            return userModel.addUser(data, () => {
              userModel.newUser((results) => res.json({
                success: true,
                message: 'Successfully added new user',
                results: results[0],
              }));
            });
          });
        }
        return res.status(400).json({
          success: false,
          message: 'Wrong email input',
        });
      }
      return res.status(400).json({
        success: false,
        message: 'Wrong input phone_number',
      });
    }
    return res.status(400).json({
      success: false,
      message: 'Failed to add new user, data must be filled',
    });
  }
  return res.status(400).json({
    success: false,
    message: 'Gender unknown',
  });
};

const editUser = (req, res) => {
  const {
    name, display_name, email, phone_number, address, birthdate,
  } = req.body;
  const data = {
    name, display_name, email, phone_number, address, birthdate,
  };
  const { id } = req.params;
  const polaNumber = /\D/g;
  if (!polaNumber.test(phone_number) && (phone_number[0] === '0' || phone_number[0] === '+')) {
    const polaEmail = /@/g;
    if (polaEmail.test(email)) {
      return userModel.editUser(data, id, (results) => {
        if (results.changedRows > 0) {
          return userModel.getUser(id, (rslt) => res.json({
            success: true,
            message: 'Successfully updated user',
            results: rslt[0],
          }));
        }
        return res.status(400).json({
          success: false,
          message: 'Failed to update user. Data hasnt changed or data is empty',
        });
      });
    }
    return res.status(400).json({
      success: false,
      message: 'Wrong email input',
    });
  }
  return res.status(400).json({
    success: false,
    message: 'Wrong input phone_number',
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  userModel.getUser(id, (rslt) => {
    userModel.deleteUser(id, (results) => {
      if (results.affectedRows > 0) {
        return res.json({
          success: true,
          message: `User with id ${id} successfully deleted`,
          results: rslt[0],
        });
      }
      return res.status(400).json({
        success: false,
        message: `Failed to delete user with id ${id}`,
      });
    });
  });
};

module.exports = {
  getUsers,
  addUser,
  editUser,
  deleteUser,
};
