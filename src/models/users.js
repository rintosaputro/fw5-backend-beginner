const db = require('../helpers/db');

const getUsers = (cb) => {
  db.query('SELECT * FROM users', (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const getUser = (id, cb) => {
  db.query('SELECT * FROM users WHERE id_user=?', [id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const addUser = (data, cb) => {
  db.query('INSERT INTO users SET ?', [data], (err) => {
    if (err) throw err;
    cb();
  });
};

const editUser = (data, id, cb) => {
  db.query('UPDATE users SET ? WHERE id_user=?', [data, id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const deleteUser = (id, cb) => {
  db.query('DELETE FROM users WHERE id_user=?', [id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  editUser,
  deleteUser,
};
