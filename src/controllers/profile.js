// const modelProfile = require('../models/profile');
const userModel = require('../models/users');
const response = require('../helpers/response');

const getProfile = async (req, res) => {
  const { id } = req.user;
  const profile = await userModel.getUserById(id);
  if (profile.length > 0) {
    return response(req, res, 'Data profile', profile[0]);
  }
  return response(req, res, 'Unexpected error', null, null, 500);
};

module.exports = {
  getProfile,
};
