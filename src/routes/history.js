const history = require('express').Router();

const {
  getHistories, addHistory, editHistory, deleteHistory,
} = require('../controllers/history');

history.get('/', getHistories);
history.post('/', addHistory);
history.patch('/:id', editHistory);
history.delete('/:id', deleteHistory);

module.exports = history;
