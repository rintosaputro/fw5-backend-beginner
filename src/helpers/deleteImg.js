const fs = require('fs');

const unlink = (req) => {
  if (req.file) {
    fs.unlink(`${req.file.path}`, (error) => {
      if (error) throw error;
    });
  }
};

module.exports = unlink;
