/* eslint-disable camelcase */
/* eslint-disable radix */
const historyModel = require('../models/history');

const getHistory = (req, res) => {
  let {
    name, type, page, limit,
  } = req.query;
  name = name || '';
  type = type || '';
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;

  const offset = (page - 1) * limit;
  const data = {
    name, type, limit, offset,
  };

  historyModel.getHistories(data, (results) => {
    historyModel.countHistories(data, (count) => {
      const { total } = count[0];
      const last = Math.ceil(total / limit);
      res.json({
        success: true,
        message: 'List histories',
        results,
        pageInfo: {
          prev: page > 1 ? `http://localhost:5000/history?page=${page - 1}` : null,
          next: page < last ? `http://localhost:5000/history?page=${page + 1}` : null,
          totalData: total,
          currentPage: page,
          lastPage: last,
        },
      });
    });
  });
};

const addHistory = (req, res) => {
  const {
    type, name, rent_date, return_date, prepayment, returned,
  } = req.body;
  const data = {
    type, name, rent_date, return_date, prepayment, returned,
  };
  if (type && name && rent_date && return_date && prepayment && returned) {
    const pola = /\D/g;
    if (!pola.test(prepayment)) {
      return historyModel.addHistory(data, () => {
        historyModel.newHistory((results) => res.json({
          success: true,
          message: 'Successfully added new History',
          results: results[0],
        }));
      });
    }
    return res.status(400).json({
      success: false,
      message: 'Prepayment must be number',
    });
  }
  return res.status(400).json({
    success: false,
    message: 'Failed add new history, data must be filled',
  });
};

module.exports = {
  getHistory,
  addHistory,
};
