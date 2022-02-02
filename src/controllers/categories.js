const categoryModel = require('../models/categories');
const getHelper = require('../helpers/get');

const getCategories = (req, res) => {
  getHelper(req, res, categoryModel.getCategories, categoryModel.countCategory, 'categories');
};

module.exports = {
  getCategories,
};
