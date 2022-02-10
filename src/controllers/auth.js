/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const response = require('../helpers/response');
const userModel = require('../models/users');

const { APP_SECRET } = process.env;

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const result = await userModel.getUserByUserName(username);
  if (result.length > 0) {
    const hash = result[0].password;
    const validatePwd = await bcrypt.compare(password, hash);
    if (validatePwd) {
      const token = jwt.sign({ id: result[0].id_user }, APP_SECRET);
      return response(req, res, 'Login success', { token });
    }
    return response(req, res, 'Wrong password', null, null, 403);
  }
  return response(req, res, 'Wrong username', null, null, 403);
};

exports.verify = (req, res) => {
  const auth = req.headers.authorization;
  if (auth.startsWith('Bearer')) {
    const token = auth.split(' ')[1];
    if (token) {
      try {
        if (jwt.verify(token, APP_SECRET)) {
          return response(req, res, 'User verified');
        }
        return response(req, res, 'User not verified', null, null, 403);
      } catch (err) {
        return response(req, res, 'User not verified', null, null, 403);
      }
    }
    return response(req, res, 'Token must be provided', null, null, 403);
  }
};
