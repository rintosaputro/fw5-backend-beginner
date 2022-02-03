const db = require('../helpers/db');

const countHistory = (data, cb) => {
  db.query(`SELECT COUNT(*) AS total FROM histories h 
  LEFT JOIN vehicles v ON h.id_vehicle =v.id_vehicle 
  LEFT JOIN users u ON h.id_user = u.id_user
  WHERE v.type LIKE '${data.search}%' OR v.brand LIKE '${data.search}%' OR v.location LIKE '${data.search}%'
  `, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const getHistories = (data, cb) => {
  db.query(`SELECT id_history, h.id_user, u.name as user_name, v.id_vehicle, v.type, v.brand, v.location, h.rent_start_date, h.rent_end_date, prepayment, h.returned, h.createdAt, h.updatedAt 
  FROM histories h LEFT JOIN users u ON h.id_user = u.id_user LEFT JOIN vehicles v ON h.id_vehicle = v.id_vehicle 
  WHERE v.type LIKE '${data.search}%' OR v.brand LIKE '${data.search}%' OR v.location LIKE '${data.search}%'
  LIMIT ${data.limit} OFFSET ${data.offset};`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const getHistory = (id, cb) => {
  db.query(`SELECT id_history, h.id_user, u.name as user_name, v.id_vehicle, v.type, v.brand, v.location, h.rent_start_date, h.rent_end_date, prepayment, h.returned, h.createdAt, h.updatedAt 
  FROM histories h LEFT JOIN users u ON h.id_user = u.id_user LEFT JOIN vehicles v ON h.id_vehicle = v.id_vehicle  
  WHERE id_history=?`, [id], (err, res) => {
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
  newHistory,
  addHistory,
  getHistory,
  editHistory,
  deleteHistory,
};
