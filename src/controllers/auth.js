/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const response = require('../helpers/response');
const userModel = require('../models/users');
const forgotModel = require('../models/forgotRequest');
const mail = require('../helpers/codeMail');

const { APP_SECRET, APP_EMAIL } = process.env;

const login = async (req, res) => {
  const { username, password } = req.body;
  const result = await userModel.getUserByUserName(username);
  if (result.length > 0) {
    const hash = result[0].password;
    const validatePwd = await bcrypt.compare(password, hash);
    if (validatePwd) {
      const data = { id: result[0].id_user };
      if (username === 'Admin') {
        data.role = 'Admin';
      } else {
        data.role = username;
      }
      const token = jwt.sign(data, APP_SECRET);
      return response(req, res, 'Login success', { token });
    }
    return response(req, res, 'Wrong password', null, null, 403);
  }
  return response(req, res, 'Wrong username', null, null, 403);
};

const verify = (req, res) => {
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

const forgotRequest = async (req, res) => {
  const {
    email, code, password, confirmPassword,
  } = req.body;

  if (email && !code && !password && !confirmPassword) {
    const user = await userModel.getUserByUserName(email);
    if (user.length === 1) {
      const checkUser = await userModel.getUserByUserName(email);
      if (checkUser.length > 0) {
        const randomCode = Math.round(Math.random() * (9999 - 1000) + 1000);
        const request = await forgotModel.createRequest(checkUser[0].id_user, randomCode);
        if (request.affectedRows > 0) {
          mail.sendMail({
            from: APP_EMAIL,
            to: email,
            subject: 'Your verification code for reset password | Backend Beginner',
            text: String(randomCode),
            html: `<b>${randomCode}<b>`,
          });
          return response(req, res, `Forgot password request has been sent to ${email}`);
        }
        return response(req, res, 'Unexpected error', null, null, 500);
      }
      return response(req, res, 'Your email is not registered', null, null, 400);
    }
    return response(req, res, 'Your email is not registered', null, null, 400);
  }

  if (email && code && password && confirmPassword) {
    if (!/\D/g.test(code)) {
      const result = await forgotModel.getRequest(code);
      if (result.length === 1) {
        if (result[0].expired === 'false') {
          return response(req, res, 'Verification code expired', null, null, 400);
        }
        const idUser = result[0].id_user;
        const user = await userModel.getUserById(idUser);
        if (user[0].email === email) {
          if (password) {
            if (password === confirmPassword) {
              const salt = await bcrypt.genSalt(10);
              const hash = await bcrypt.hash(password, salt);
              return userModel.editUser({ password: hash }, idUser, async (resfin) => {
                if (resfin.affectedRows > 0) {
                  await forgotModel.updateExpired(result[0].id_request);
                  return response(req, res, 'Password successfully reset');
                }
                return response(req, res, 'Unexpected error', null, null, 500);
              });
            }
            return response(req, res, 'Confirm password is not same as password', null, null, 400);
          }
          return response(req, res, 'Password cannot be empty');
        }
        return response(req, res, 'Invalid Email', null, null, 400);
      }
    }
    return response(req, res, 'Invalid code', null, null, 400);
  }
  return response(req, res, 'You have to provide confirmation data', null, null, 400);
};

module.exports = {
  login,
  verify,
  forgotRequest,
};
