const checkDate = (date) => {
  let check = false;
  if (date.length === 10) {
    if (date[4] === '-' && date[7] === '-') {
      const dateArr = date.split('-');
      const not = /\D/g;
      if (!not.test(dateArr[0]) && !not.test(dateArr[0]) && !not.test(dateArr[0])) {
        const year = parseInt(dateArr[0], 10);
        const month = parseInt(dateArr[1], 10);
        const day = parseInt(dateArr[2], 10);

        if (year > 1000 && year < 3000) {
          if (month > 0 && month <= 12) {
            const montLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (year % 4 === 0) montLength[1] = 29;
            if (day > 0 && day <= montLength[month - 1]) {
              check = true;
            }
          }
        }
      }
    }
  }
  return check;
};

module.exports = checkDate;
