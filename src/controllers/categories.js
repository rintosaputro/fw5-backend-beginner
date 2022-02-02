const categoryModel = require('../models/categories');
const getHelper = require('../helpers/get');

const getCategories = (req, res) => {
  getHelper(req, res, categoryModel.getCategories, categoryModel.countCategory, 'categories');
};

const addCategory = (req, res) => {
  const { name } = req.body;
  if (name) {
    return categoryModel.checkCategories(name, (checkResults) => {
      if (checkResults > 0) {
        return res.status(400).json({
          success: false,
          message: 'Failed to add new category. Data already exists',
        });
      }
      return categoryModel.addCategory(name, () => {
        categoryModel.newCategory((results) => res.json({
          success: true,
          message: 'Successfully added new category',
          results: results[0],
        }));
      });
    });
  }
  return res.status(400).json({
    success: false,
    message: 'Data must be filled',
  });
};

module.exports = {
  getCategories,
  addCategory,
};
