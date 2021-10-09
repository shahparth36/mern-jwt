const Boom = require("@hapi/boom");

const { refreshToken } = require("../constants/jwt");

const roles = require("../constants/roles");

const { User, Doctor } = require("../models");

const { generateTokens, verifyToken } = require("../utils/jwt");

const { hashPassword, verifyPassword } = require("../utils/password");

async function signup(req, res, next) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      gender,
      dob,
      role,
    } = req.body;

    let newUser;
    let userDetails = {
      firstName,
      lastName,
      email,
      password: hashPassword(password),
      phoneNumber,
      gender,
      dob,
    };

    const foundUser = await User.findOne({ email });
    const foundDoctor = await Doctor.findOne({ email });

    if (foundUser || foundDoctor)
      throw Boom.badRequest("User with given email already exists");
    // User has role of User
    else if (role === roles.user) {
      newUser = await User.create(userDetails);
    }
    // User has role of Doctor
    else if (role === roles.doctor) {
      const { specialisation, image, fee, certificate } = req.body;
      const doctorDetails = {
        ...userDetails,
        specialisation,
        image,
        fee,
        certificate,
      };
      newUser = await Doctor.create(doctorDetails);
    } else throw Boom.badRequest("Please provide a valid role");

    return res
      .status(200)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    // User with given email does not exist
    if (!foundUser) throw Boom.unauthorized("Please provide valid credentials");
    // User has provided wrong password
    else if (!verifyPassword(password, foundUser.password))
      throw Boom.unauthorized("Please provide valid credentials");
    // User has given correct email and password
    else {
      const dataToBeEncrypted = {
        _id: foundUser._id,
        email: foundUser.email,
      };
      const { accessToken, refreshToken } = generateTokens(dataToBeEncrypted);

      return res
        .status(200)
        .json({ message: "Logged In successfully", accessToken, refreshToken });
    }
  } catch (error) {
    next(error);
  }
}

async function verifyRefreshToken(req, res, next) {
  try {
    const { token } = req.body;
    const verifiedToken = verifyToken(token, refreshToken);
    if (!verifiedToken) throw Boom.unauthorized("Invalid Refresh Token");
    else {
      const tokens = generateTokens(verifiedToken);
      return res.status(200).json({
        message: "Valid Refresh Token",
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signup,
  login,
  verifyRefreshToken,
};
