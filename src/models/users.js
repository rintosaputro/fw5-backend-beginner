const db = require('../helpers/db');

const getUsers = (cb) => {
  db.query('SELECT * FROM users', (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const getUser = (id, cb) => {
  db.query('SELECT * FROM users WHERE id=?', [id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const addUser = (data, cb) => {
  db.query('INSERT INTO users SET ?', [data], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

module.exports = {
  getUsers,
  getUser,
  addUser,
};
