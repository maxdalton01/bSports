const account = require('../models/userModel.js');
const passport = require('passport')

passport.use(account.createStrategy());

passport.serializeUser(account.serializeUser());
passport.deserializeUser(account.deserializeUser());

const logout = (req,res) => {
    req.logout();
    res.redirect('/');
};
const register = (req,res) => {
    //console.log(req.body)
    account.register(new account({username: req.body.username}), req.body.password, (err,user) => {
        if (err){
            res.redirect("/")
        }
        else{
            passport.authenticate("local") (req, res, function() {
                res.redirect("/events");
            });
        }
    });
};

exports.register = register;
exports.logout = logout;