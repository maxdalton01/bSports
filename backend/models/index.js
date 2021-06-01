// models/index.js

const dbLogin = require("../config.js"); // Load in config

const mongoose = require("mongoose"); // import mongoos;

const db = {}; // make empty db JSON
db.mongoose = mongoose;
db.url = dbLogin.url;
db.events = require("./eventModel.js")(mongoose);
db.users = require("./userModel.js")(mongoose);
db.faq = require("./faqModel.js")(mongoose);

module.exports = db;
