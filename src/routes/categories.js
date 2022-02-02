const categories = require('express').Router();

const {
  getCategories, addCategory, editCategory,
} = require('../controllers/categories');

categories.get('/', getCategories);
categories.post('/', addCategory);
categories.patch('/:id', editCategory);

module.exports = categories;
