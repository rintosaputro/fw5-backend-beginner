// exports.checkEmail = (email) => {
//   let result = false;
//   const arrEmail = email.split('');

//   if (/\D/.test(arrEmail[0])) {
//     if (arrEmail.includes('@') && arrEmail.includes('.')) {
//       result = true;
//     }
//   }
//   return result;
// };

const checkEmail = (mail) => {
  let result = false;
  const arrEmail = mail.split('');

  if (/\D/.test(arrEmail[0])) {
    if (arrEmail.includes('@') && arrEmail.includes('.')) {
      result = true;
    }
  }
  return result;
};

module.exports = checkEmail;
