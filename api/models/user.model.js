const mongoose = require("mongoose");

const roles = require("../constants/roles");

const Schema = mongoose.Schema;

const baseOptions = {
  discriminatorKey: "userType",
};

const baseSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    phoneNumber: { type: String, required: true },
    gender: { type: String, required: true },
    isVerified: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, required: true, default: Date.now },
  },
  baseOptions
);

const Base = mongoose.model("Base", baseSchema);

const userSchema = new Schema({
  role: { type: String, required: true, default: roles.user },
});

const User = Base.discriminator("User", userSchema);

const doctorSchema = new Schema({
  role: { type: String, required: true, default: roles.doctor },
  specialisation: { type: String, required: true },
  image: { type: String, required: true },
  fee: { type: Number, required: true },
  certificate: { type: String, required: false },
});

const Doctor = Base.discriminator("Doctor", doctorSchema);

module.exports = {
  User,
  Doctor,
};
