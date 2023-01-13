const bcrypt = require("bcrypt");

async function hp(password) {
  let pass = await bcrypt.hash(password, 10);
  return pass;
}

module.exports = { hp };
