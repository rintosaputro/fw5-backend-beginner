const checkStartEnd = (start, end) => {
  let result = false;
  const rentStart = start.split('-');
  const rentEnd = end.split('-');
  if (rentStart[0] <= rentEnd[0] && rentStart[1] <= rentEnd[1] && rentStart[2] < rentEnd[2]) {
    result = true;
  }
  return result;
};

module.exports = checkStartEnd;
