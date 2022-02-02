/* eslint-disable radix */
const categoryModel = require('../models/categories');
const getHelper = require('../helpers/get');

const getCategories = (req, res) => {
  getHelper(req, res, categoryModel.getCategories, categoryModel.countCategory, 'categories');
};

const addCategory = (req, res) => {
  const { name } = req.body;
  if (name) {
    return categoryModel.checkCategories(name, (checkResults) => {
      if (checkResults.length === 0) {
        return categoryModel.addCategory(name, () => {
          categoryModel.newCategory((results) => res.json({
            success: true,
            message: 'Successfully added new category',
            results: results[0],
          }));
        });
      }
      return res.status(400).json({
        success: false,
        message: 'Failed to add new category. Data already exists',
      });
    });
  }
  return res.status(400).json({
    success: false,
    message: 'Data must be filled',
  });
};

const editCategory = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (id && name) {
    return categoryModel.checkCategories(name, (checkResults) => {
      if (checkResults.length === 0) {
        return categoryModel.editCategory(name, id, (results) => {
          if (results.changedRows > 0) {
            return res.json({
              success: true,
              message: 'Edited successfully',
              results: {
                id_category: parseInt(id),
                name,
              },
            });
          }
          return res.status(404).json({
            success: false,
            message: `Failed to edit category with id ${id}, data doesn't change`,
          });
        });
      }
      return res.status(400).json({
        success: false,
        message: 'Failed to edit category. Name already exists',
      });
    });
  }
  return res.status(400).json({
    success: false,
    message: 'id and name must be filled',
  });
};

module.exports = {
  getCategories,
  addCategory,
  editCategory,
};
