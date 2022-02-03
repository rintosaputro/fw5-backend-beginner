const history = require('express').Router();

const {
  getHistories, getHistory, addHistory, editHistory, deleteHistory,
} = require('../controllers/histories');

history.get('/', getHistories);
history.get('/:id', getHistory);
history.post('/', addHistory);
history.patch('/:id', editHistory);
history.delete('/:id', deleteHistory);

module.exports = history;
