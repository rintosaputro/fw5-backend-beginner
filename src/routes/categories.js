const categories = require('express').Router();

const {
  getCategories, addCategory,
} = require('../controllers/categories');

categories.get('/', getCategories);
categories.post('/', addCategory);

module.exports = categories;
