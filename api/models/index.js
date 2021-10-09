const mongoose = require("mongoose");

const dbConfig = require("../config/db.config");

const db = {};

// adding mongoose library and connection string to db object
db.mongoose = mongoose;
db.url = dbConfig.url;

// adding Data Models to db object
db.User = require("./user.model").User;
db.Doctor = require("./user.model").Doctor;

module.exports = db;
