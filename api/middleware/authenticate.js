const { UnauthorizedError } = require("../constants/error");

const {
  accessToken: accessTokenConstant,
  refreshToken: refreshTokenConstant,
} = require("../constants/jwt");

const { User } = require("../models");

const { extractToken, verifyToken, generateTokens } = require("../utils/jwt");

const { handleError } = require("../middleware/error");

async function authenticate(req, res, next) {
  try {
    const token = extractToken(req); // extracting token from headers/query

    // if there is no access or refresh token present inside headers/query
    if (!token)
      return res
        .status(401)
        .json({ type: UnauthorizedError, message: "Please provide a token" });

    // verifying and retreiving data from the token
    const encryptedDataInAccessToken = verifyToken(token, accessTokenConstant);

    // accessToken expired
    if (!encryptedDataInAccessToken)
      return res
        .status(401)
        .json({ type: UnauthorizedError, message: "Invalid Access Token" });

    // accessToken Valid
    const foundUser = await User.findOne({
      email: encryptedDataInAccessToken.email,
    });
    // User with given email does not exist
    if (!foundUser)
      return res.status(401).json({
        type: UnauthorizedError,
        message: "User with given email does not exist",
      });
    else {
      req.user = foundUser;
      next();
    }
  } catch (error) {
    return res
      .status(error.statusCode)
      .json({ type: error.type, message: error.message });
  }
}

module.exports = {
  authenticate,
};
