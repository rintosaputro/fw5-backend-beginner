const history = require('express').Router();

// const {
//   getHistory, addHistory, editHistory, deleteHistory,
// } = require('../controllers/history');
const {
  getHistory, addHistory, editHistory,
} = require('../controllers/history');

history.get('/', getHistory);
history.post('/', addHistory);
history.patch('/:id', editHistory);
// history.delete('/:id', deleteHistory);

module.exports = history;
