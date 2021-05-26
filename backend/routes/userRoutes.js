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

router.post('/logout', express.json({extended: true}), express.urlencoded({extended: true}),account.logout);

router.get('/user/:id', account.info);

router.put('/user/:id/upvote', account.upVote);

router.put('/user/:id/downvote', account.downVote);


module.exports = router;