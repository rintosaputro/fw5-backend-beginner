/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
const bcrypt = require('bcrypt');
const userModel = require('../models/users');
const helperGet = require('../helpers/get');
const checkDate = require('../helpers/checkDate');
const response = require('../helpers/response');
const upload = require('../helpers/upload').single('image');
const checkEmail = require('../helpers/checkEmail');

const getUsers = (req, res) => {
  helperGet(req, res, userModel.getUsers, userModel.countUsers, 'users');
};

const getUser = (req, res) => {
  const { id } = req.params;
  userModel.getUser(id, (results) => {
    if (results.length > 0) {
      return response(req, res, `User with id ${id}`, results[0]);
    }
    return response(req, res, `User with id ${id} not found`, null, null, 404);
  });
};

const addUser = (req, res) => {
  const {
    name, username, email, password, phone_number,
  } = req.body;
  if (name && username && email && password && phone_number) {
    if (!checkEmail(email)) {
      return response(req, res, 'Wrong email input', null, null, 400);
    }
    if (/\D/g.test(phone_number) && (phone_number[0] !== '0' || phone_number[0] !== '+') && phone_number.length < 10 && phone_number.length > 14) {
      return response(req, res, 'Wrong phone number input', null, null, 400);
    }
    const dataCheck = {
      username, email, phone_number,
    };
    return userModel.checkUser(dataCheck, async (user) => {
      if (user.length > 0) {
        return response(req, res, 'User name or phone or email has been registered', null, null, 400);
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const data = {
        name, username, email, password: hash, phone_number,
      };
      return userModel.addUser(data, () => {
        userModel.newUser((results) => response(req, res, 'Successfully added new user', results[0]));
      });
    });
  }
  return response(req, res, 'Failed to create user, data must be filled', null, null, 400);
};

const editUser = (req, res) => {
  const { id } = req.params;
  const {
    name, username, email, phone_number, address, birthdate,
  } = req.body;

  if (name && username && email && phone_number && address && birthdate) {
    const notNumber = /\D/g;
    if (!notNumber.test(phone_number) && (phone_number[0] === '0' || phone_number[0] === '+') && phone_number.length < 15 && phone_number.length >= 10) {
      if (checkEmail(email)) {
        if (checkDate(birthdate)) {
          const data = {
            name, username, email, phone_number, address, birthdate,
          };
          return userModel.editUser(data, id, (results) => {
            if (results.changedRows > 0) {
              return userModel.getUser(id, (rslt) => response(req, res, 'Successfully updated user', rslt[0]));
            }
            return response(req, res, 'Failed to update user. Data hasnt changed.', null, null, 400);
          });
        }
        return response(req, res, 'Wrong birthdate input. Format birthdate YYYY-MM-DD', null, null, 400);
      }
      return response(req, res, 'Wrong email input', null, null, 400);
    }
    return response(req, res, 'Wrong phone number input', null, null, 400);
  }
  return response(req, res, `Failed to edit user with id ${id}. Some data is empty.`, null, null, 400);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  userModel.getUser(id, (rslt) => {
    userModel.deleteUser(id, (results) => {
      if (results.affectedRows > 0) {
        return response(req, res, `User with id ${id} successfully deleted`, rslt[0]);
      }
      return response(req, res, `Failed to delete user with id ${id}`, null, null, 400);
    });
  });
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  editUser,
  deleteUser,
};
