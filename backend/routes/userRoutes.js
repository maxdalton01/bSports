const express = require("express");
const account = require('../controllers/userController.js')
const passport = require('passport');
const router = express.Router();

/*router.get('/', (req,res) => {
    res.send('home page, force login/registration here');
});*/

router.post('/login', passport.authenticate('local'), function(req,res) {           //will return 401 unauthorized if failed, id otherwise
    res.send(req.user.id)                
});

router.post('/register', express.json({extended: true}), express.urlencoded({extended: true}),account.register);

router.post('/logout', express.json({extended: true}), express.urlencoded({extended: true}),account.logout);

router.get('/user/:id', account.info);                      //Gets user name and rating(unused rn) when userid is passed in

router.put('/user/:id/upvote', account.upVote);             ///this and below currently unused but inc/dec rating

router.put('/user/:id/downvote', account.downVote);


module.exports = router;