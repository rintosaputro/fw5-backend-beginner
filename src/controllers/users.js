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

const addUser = (req, res) => {
  const newUser = {
    name: req.body.name,
    display_name: req.body.display_name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    address: req.body.address,
    birthdate: req.body.birthdate,
  };
  userModel.addUser(newUser, (results) => {
    if (results.affectedRows > 0) {
      return res.json({
        success: true,
        message: 'Successfully added new user',
        user: newUser,
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Failed to adding new user',
    });
  });
};

module.exports = {
  getUsers,
  getUser,
  addUser,
};
