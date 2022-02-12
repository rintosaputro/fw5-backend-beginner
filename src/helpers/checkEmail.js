exports.checkEmail = (email) => {
  let result = false;
  const arrEmail = email.split('');
  const notNum = /\D/;

  if (notNum.test(arrEmail[0])) {
    if (arrEmail.includes('@') && arrEmail.includes('.')) {
      result = true;
    }
  }
  return result;
};
