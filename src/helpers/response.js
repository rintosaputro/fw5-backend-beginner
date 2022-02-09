const response = (res, message, results, pageInfo, stats = 200) => {
  let success = true;
  if (stats >= 400) {
    success = false;
  }
  const data = {
    success,
    message,
  };
  if (results) {
    data.results = results;
  }
  if (pageInfo) {
    data.pageInfo = pageInfo;
  }
  return res.status(stats).json(data);
};

module.exports = response;
