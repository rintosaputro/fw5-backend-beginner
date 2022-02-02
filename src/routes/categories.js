const categories = require('express').Router();

const {
  getCategories,
} = require('../controllers/categories');

categories.get('/', getCategories);

module.exports = categories;
