async function emailvalidation(email) {
  var reg =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return reg.test(email);
}

module.exports = emailvalidation;
