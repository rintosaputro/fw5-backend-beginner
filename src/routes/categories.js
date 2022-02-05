const categories = require('express').Router();

const {
  getCategories, getCategoriesData, getCategory, addCategory, editCategory, deleteCategory,
} = require('../controllers/categories');

categories.get('/', getCategories);
categories.get('/data', getCategoriesData);
categories.get('/:id', getCategory);
categories.post('/', addCategory);
categories.patch('/:id', editCategory);
categories.delete('/:id', deleteCategory);

module.exports = categories;
