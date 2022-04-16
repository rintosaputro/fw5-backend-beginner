/* eslint-disable no-underscore-dangle */
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    // cb(null, './uploads/');
    // eslint-disable-next-line no-unused-vars
    fs.mkdir('./uploads/', (err) => {
      cb(null, './uploads/');
    });
  },
  filename(req, file, cb) {
    const _file = file.originalname.split('.');
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${_file[0]}-${uniqueSuffix}.${_file[_file.length - 1]}`);
  },
});

const fileFilter = (req, file, cb) => {
  const typeImage = ['image/jpeg', 'image/png', 'image/gir'];
  const fileSize = parseInt(req.headers['content-length'], 10);

  if (!typeImage.includes(file.mimetype)) {
    cb(new Error('Image type mismatch'), false);
  } else if (fileSize >= 2000000) {
    cb(new Error('Image file is too large, max size 2 mb'), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
