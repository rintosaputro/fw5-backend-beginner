const db = require('../helpers/db');

const getHistories = (cb) => {
  db.query(`SELECT id_history, u.name as user_name, v.brand as brand, rent_start_date, rent_end_date, prepayment 
  FROM history h LEFT JOIN users u ON h.id_user = u.id_user LEFT JOIN vehicles v ON h.id_vehicle = v.id_vehicle;`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const checkHistory = (data, cb) => {
  db.query(`SELECT * FROM history WHERE type='${data.type}' AND name='${data.name}' AND rent_date='${data.rent_date}' 
  AND return_date='${data.return_date}' AND prepayment=${data.prepayment}`, (err, res) => {
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

const getHistory = (id, cb) => {
  db.query('SELECT * FROM history WHERE id_history=?', [id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const editHistory = (data, id, cb) => {
  db.query('UPDATE history SET ? WHERE id_history=?;', [data, id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const deleteHistory = (id, cb) => {
  db.query('DELETE FROM history WHERE id_history=?', [id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

module.exports = {
  getHistories,
  checkHistory,
  newHistory,
  addHistory,
  getHistory,
  editHistory,
  deleteHistory,
};
