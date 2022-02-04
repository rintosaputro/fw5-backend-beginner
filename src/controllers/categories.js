/* eslint-disable radix */
const categoryModel = require('../models/categories');
const getHelper = require('../helpers/get');

const getCategories = (req, res) => {
  getHelper(req, res, categoryModel.getCategories, categoryModel.countCategory, 'categories');
};

const getCategory = (req, res) => {
  const { id } = req.params;
  categoryModel.getCategory(id, (results) => {
    if (results.length > 0) {
      return res.json({
        success: true,
        message: `Data ategory with id ${id}`,
        results: results[0],
      });
    }
    return res.status(404).json({
      success: false,
      message: `Category not found with id ${id}`,
    });
  });
};

const addCategory = (req, res) => {
  const { type } = req.body;
  if (type) {
    return categoryModel.checkCategories(type, (checkResults) => {
      if (checkResults.length === 0) {
        return categoryModel.addCategory(type, () => {
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
  const { type } = req.body;
  if (type) {
    return categoryModel.checkCategories(type, (checkResults) => {
      if (checkResults.length === 0) {
        return categoryModel.editCategory(type, id, (results) => {
          if (results.changedRows > 0) {
            return res.json({
              success: true,
              message: 'Edited successfully',
              results: {
                id_category: parseInt(id),
                type,
              },
            });
          }
          return res.status(400).json({
            success: false,
            message: `Failed to edit category with id ${id}. Data hasnt changed or data is empty`,
          });
        });
      }
      return res.status(400).json({
        success: false,
        message: `Failed to edit category. Type ${type} already exists`,
      });
    });
  }
  return res.status(400).json({
    success: false,
    message: 'Type must be filled',
  });
};

const deleteCategory = (req, res) => {
  let { id } = req.params;
  id = id || 0;
  categoryModel.getCategory(id, (categoryDeleted) => {
    categoryModel.deleteCategory(id, (results) => {
      if (results.affectedRows > 0) {
        return res.json({
          success: true,
          message: `Vehicle with id ${id} successfully deleted`,
          results: categoryDeleted[0],
        });
      }
      return res.status(400).json({
        success: false,
        message: `Failed to delete, category with id ${id} not found`,
      });
    });
  });
};

module.exports = {
  getCategories,
  getCategory,
  addCategory,
  editCategory,
  deleteCategory,
};
