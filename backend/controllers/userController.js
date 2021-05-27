const account = require('../models/userModel.js');
const passport = require('passport')


passport.use(account.createStrategy());

passport.serializeUser(account.serializeUser());
passport.deserializeUser(account.deserializeUser());

const logout = (req,res) => {
    req.logout();
    res.redirect('/');       //redirect to proper home page
};
const register = (req,res) => {
    account.register(new account({username: req.body.username}), req.body.password, (err,user) => {
        if (err){
            res.redirect("/")
        }
        else{
            passport.authenticate("local") (req, res, function() {
                res.redirect("/events");                //discuess what our proper page is
            });
        }
    });
};
const upVote = (req,res) => {
    if(!req.body) {                              //max's coding style
        return res.status(400).send({ 
            message: "Bad request"
        });
    }
    const id = req.params.id;
    account.findByIdAndUpdate(id, {$inc : {'rating': 1} }, {useFindAndModify: false})
    .then((data) => {
        if(!data) {
            res.status(404).send({
                message: "User not found"
            });
        } else {
            res.send({
                message: "User found and rating increased"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving user"
        });
    });
};

const downVote = (req,res) => {
    if(!req.body) {                              //max's coding style
        return res.status(400).send({ 
            message: "Bad request"
        });
    }
    const id = req.params.id;
    account.findByIdAndUpdate(id, {$inc : {'rating': -1} }, {useFindAndModify: false})
    .then((data) => {
        if(!data) {
            res.status(404).send({
                message: "User not found"
            });
        } else {
            res.send({
                message: "User found and rating decreased"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving user"
        });
    });
};

const info = (req,res) => {
    if(!req.body) {                              //max's coding style
        return res.status(400).send({ 
            message: "Bad request"
        });
    }
    const id = req.params.id;
    account.findById(id)
    .then((data) => {
        if(!data) {
            res.status(404).send({
                message: "User not found"
            });
        } else {
            res.send({
                message: "User found",
                data
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving user"
        });
    });
};

exports.register = register;
exports.logout = logout;
exports.upVote = upVote;
exports.downVote = downVote;
exports.info = info;