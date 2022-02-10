const bcrypt = require('bcrypt');
const response = require('../helpers/response');
const userModel = require('../models/users');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const result = await userModel.getUserByUserName(username);
  if (result.length > 0) {
    const hash = result[0].password;
    const validatePwd = await bcrypt.compare(password, hash);
    if (validatePwd) {
      return response(req, res, 'Login success');
    }
    return response(req, res, 'Wrong password', null, null, 403);
  }
  return response(req, res, 'Wrong username', null, null, 403);
};
