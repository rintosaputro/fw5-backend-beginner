const userModel = require('../models/users');

const getUsers = (req, res) => {
  userModel.getUsers((results) => res.json({
    success: true,
    message: 'List users',
    results,
  }));
};

const getUser = (req, res) => {
  const { id } = req.params;
  userModel.getUser(id, (results) => {
    if (results.length > 0) {
      return res.json({
        success: true,
        message: `Detail user with id ${id}`,
        results,
      });
    }
    return res.status(404).json({
      success: false,
      message: `User with id ${id} not found`,
    });
  });
};

module.exports = {
  getUsers,
  getUser,
};
