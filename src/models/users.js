const db = require('../helpers/db');

const getUsers = (cb) => {
  db.query('SELECT * FROM users', (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

module.exports = {
  getUsers,
};
