/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
const bcrypt = require('bcrypt');
const userModel = require('../models/users');
const helperGet = require('../helpers/get');
const checkDate = require('../helpers/checkDate');
const response = require('../helpers/response');
const upload = require('../helpers/upload').single('image');

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
  upload(req, res, async (err) => {
    if (err) {
      return response(req, res, err.message, null, null, 400);
    }
    let {
      name, display_name, gender, email, password, phone_number, address, birthdate,
    } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    if (Number(gender) >= 1 || Number(gender) <= 2) {
      if (name && display_name && email && password && phone_number && address && birthdate) {
        const notNumber = /\D/g;
        if (!notNumber.test(phone_number) && (phone_number[0] === '0' || phone_number[0] === '+') && phone_number.length < 15 && phone_number.length >= 10) {
          const polaEmail = /@/g;
          if (polaEmail.test(email)) {
            if (checkDate(birthdate)) {
              const data = {
                name, display_name, gender, email, password: hash, phone_number, address, birthdate,
              };
              return userModel.checkUser(data, (checkResult) => {
                if (checkResult.length > 0) {
                  return response(req, res, 'User name, phone or email already used', null, null, 400);
                }
                return userModel.addUser(data, () => {
                  userModel.newUser((results) => response(req, res, 'Successfully added new user', results[0]));
                });
              });
            }
            return response(req, res, 'Wrong birthdate input. Format birthdate YYYY-MM-DD', null, null, 400);
          }
          return response(req, res, 'Wrong email input', null, null, 400);
        }
        return response(req, res, 'Wrong phone_number input', null, null, 400);
      }
      return response(req, res, 'Failed to add new user, data must be filled', null, null, 400);
    }
    return response(req, res, 'Gender unknown. 1 for male and 2 for female', null, null, 400);
  });
};

const editUser = (req, res) => {
  const { id } = req.params;
  const {
    name, display_name, email, phone_number, address, birthdate,
  } = req.body;

  if (name && display_name && email && phone_number && address && birthdate) {
    const notNumber = /\D/g;
    if (!notNumber.test(phone_number) && (phone_number[0] === '0' || phone_number[0] === '+') && phone_number.length < 15 && phone_number.length >= 10) {
      const polaEmail = /@/g;
      if (polaEmail.test(email)) {
        if (checkDate(birthdate)) {
          const data = {
            name, display_name, email, phone_number, address, birthdate,
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
