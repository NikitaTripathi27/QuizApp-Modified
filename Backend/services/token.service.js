const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { tokenTypes } = require("../config/token");

const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    type: type,
    iat: Math.floor(Date.now() / 1000),
    exp: expires,
  };

  const token = jwt.sign(payload, secret);
  return token;
};

const generateAuthTokens = async (user) => {
  const expires = Math.floor(Date.now() / 1000) + config.jwt.accessExpirationMinutes * 60;

  const accessToken = generateToken(
    user._id,
    expires,
    tokenTypes.ACCESS
  )

  return {
    access: {
      token: accessToken,
      expires: new Date(expires * 1000),
    },
  };
};

module.exports = {
  generateToken,
  generateAuthTokens,
};