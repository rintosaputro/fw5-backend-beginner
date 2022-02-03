const db = require('../helpers/db');

const countHistory = (data, cb) => {
  db.query(`SELECT COUNT(*) AS total FROM histories h 
  LEFT JOIN vehicles v ON h.id_vehicle =v.id_vehicle 
  LEFT JOIN users u ON h.id_user = u.id_user`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const getHistories = (data, cb) => {
  db.query(`SELECT id_history, u.name as user_name, v.brand as brand, rent_start_date, rent_end_date, prepayment, h.createdAt, h.updatedAt 
  FROM histories h LEFT JOIN users u ON h.id_user = u.id_user LEFT JOIN vehicles v ON h.id_vehicle = v.id_vehicle 
  LIMIT ${data.limit} OFFSET ${data.offset};`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const checkHistory = (data, cb) => {
  db.query(`SELECT * FROM histories WHERE id_user=${data.id_user} AND id_vehicle=${data.id_vehicle} AND rent_start_date='${data.rent_start_date}' 
  AND rent_end_date='${data.rent_end_date}' AND prepayment=${data.prepayment}`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const newHistory = (cb) => {
  db.query('SELECT * FROM histories ORDER BY id_history DESC LIMIT 1', (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const addHistory = (data, cb) => {
  db.query('INSERT INTO histories SET ?', [data], (err) => {
    if (err) throw err;
    cb();
  });
};

const getHistory = (id, cb) => {
  db.query('SELECT * FROM histories WHERE id_history=?', [id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const editHistory = (data, id, cb) => {
  db.query('UPDATE histories SET ? WHERE id_history=?;', [data, id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const deleteHistory = (id, cb) => {
  db.query('DELETE FROM histories WHERE id_history=?', [id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

module.exports = {
  countHistory,
  getHistories,
  checkHistory,
  newHistory,
  addHistory,
  getHistory,
  editHistory,
  deleteHistory,
};
