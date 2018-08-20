var express = require('express')
var router = express.Router();
var passport = require('passport')
var User = require('../models/users')

router.get('/', function(req, res){
    res.render("landing");
});


router.get('/register', function(req, res){
    res.render('register')
})

router.post('/register', function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash('error', err.message)
            return res.render('register')
        }
        passport.authenticate('local')(req, res, function(){
            req.flash('success', 'Welcome to the camps ' + user.username)
            res.redirect('/campgrounds');
        });
    });
})


router.get('/login', function(req, res){
    res.render('login')
})

//logout route
router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', "You've been logged out!")
    res.redirect('/campgrounds');
})

//login logic
router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), function(req, res){
    
})


module.exports = router;