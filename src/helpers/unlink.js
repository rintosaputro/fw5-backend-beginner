/* eslint-disable no-console */
const fs = require('fs');

const unlink = (req) => {
  fs.unlink(`${req.file.path}`, (error) => {
    console.log(error);
  });
};

module.exports = unlink;
