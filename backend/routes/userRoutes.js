const express = require("express");
const account = require('../controllers/userController.js')
const passport = require('passport');
const router = express.Router();

router.get('/', (req,res) => {
    res.send('home page, force login/registration here');
});
router.post('/login', passport.authenticate('local', { failureRedirect: '/login'}), function(req, res) {
    res.redirect('/events');
});
router.post('/register', express.json({extended: true}), express.urlencoded({extended: true}),account.register);


module.exports = router;