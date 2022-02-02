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

const checkCategories = (data, cb) => {
  db.query(`SELECT name FROM categories WHERE name='${data.name}'`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const newCategory = (cb) => {
  db.query('SELECT * FROM categories ORDER BY id_category DESC LIMIT 1', (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const addCategory = (data, cb) => {
  db.query(`INSERT INTO categories (name) VALUES ('${data}')`, (err) => {
    if (err) throw err;
    cb();
  });
};

module.exports = {
  countCategory,
  getCategories,
  checkCategories,
  newCategory,
  addCategory,
};
