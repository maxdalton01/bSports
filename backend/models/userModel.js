const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const accountSchema = new mongoose.Schema({
    username: {type: String},
    rating: {type:Number, default: 0}    //user rating that is currently unused
});

accountSchema.plugin(passportLocalMongoose,);           //sets up local password authentication

module.exports = mongoose.model("account",accountSchema);