/* eslint-disable object-shorthand */

const { User } = require('../models/user');

/* eslint-disable no-unused-vars */

const validate = async ({ decoded }, request, h) => {
  try {
    const { email } = decoded.payload;
    const user = await User.findOne({
      where: { email: email },
    });
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true };
  } catch (error) {
    console.error(error);
    return { isValid: false };
  }
};

module.exports = { validate };
