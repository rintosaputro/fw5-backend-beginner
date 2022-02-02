const db = require('../helpers/db');

const countCategory = (data, cb) => {
  db.query(`SELECT COUNT(*) as total FROM categories WHERE name LIKE '${data.search}%'`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const getCategories = (data, cb) => {
  db.query(`SELECT * FROM categories WHERE name LIKE '${data.search}%' LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

module.exports = {
  countCategory,
  getCategories,
};
