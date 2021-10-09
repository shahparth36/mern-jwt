const jwt = require("jsonwebtoken");

const { accessToken, refreshToken } = require("../constants/jwt");

const accessTokenSecret = JSON.parse(process.env.ACCESS_TOKEN_SECRET);
const refreshTokenSecret = JSON.parse(process.env.REFRESH_TOKEN_SECRET);

function generateToken(dataToBeEncrypted, tokenType) {
  if (tokenType === accessToken)
    return jwt.sign(dataToBeEncrypted, accessTokenSecret.key, {
      algorithm: accessTokenSecret.type,
      expiresIn: `${accessTokenSecret.expiresIn}m`,
    });
  else if (tokenType === refreshToken)
    return jwt.sign(dataToBeEncrypted, refreshTokenSecret.key, {
      algorithm: refreshTokenSecret.type,
      expiresIn: `${refreshTokenSecret.expiresIn}m`,
    });
}

function generateTokens(dataToBeEncrypted) {
  return {
    accessToken: generateToken(dataToBeEncrypted, accessToken),
    refreshToken: generateToken(dataToBeEncrypted, refreshToken),
  };
}

function verifyToken(token, tokenType) {
  if (tokenType === accessToken)
    return jwt.verify(token, accessTokenSecret.key, function (err, decoded) {
      if (err) return false;
      return decoded;
    });
  else if (tokenType === refreshToken)
    return jwt.verify(token, refreshTokenSecret.key, function (err, decoded) {
      if (err) return false;
      return decoded;
    });
}

function extractToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

module.exports = {
  generateToken,
  generateTokens,
  verifyToken,
  extractToken,
};
