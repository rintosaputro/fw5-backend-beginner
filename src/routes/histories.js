const history = require('express').Router();

const {
  getHistories, getHistoriesByFilter, getHistory,
  addHistory, addHistoryComplete, editAllHistory, editHistory, deleteHistory,
} = require('../controllers/histories');
const { verifyUser } = require('../helpers/auth');

history.get('/', getHistories);
history.get('/filter', getHistoriesByFilter);
history.post('/', verifyUser, addHistory);
history.post('/complete', verifyUser, addHistoryComplete);
history.get('/:id', verifyUser, getHistory);
history.put('/:id', verifyUser, editAllHistory);
history.patch('/:id', verifyUser, editHistory);
history.delete('/:id', verifyUser, deleteHistory);

module.exports = history;
