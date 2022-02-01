const db = require('../helpers/db');

const countHistories = (data, cb) => {
  db.query(`SELECT COUNT(*) as total FROM history WHERE name LIKE '${data.name}%'`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const getHistories = (data, cb) => {
  db.query(`SELECT * FROM history WHERE name LIKE '${data.name}%' OR type LIKE '${data.type}' LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const newHistory = (cb) => {
  db.query('SELECT * FROM history ORDER BY id_history DESC LIMIT 1', (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const addHistory = (data, cb) => {
  db.query('INSERT INTO history SET ?', [data], (err) => {
    if (err) throw err;
    cb();
  });
};

module.exports = {
  countHistories,
  getHistories,
  newHistory,
  addHistory,
};
