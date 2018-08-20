var express = require('express')
var router = express.Router();
var Campground = require('../models/campground')
var Comment = require('../models/comment')
var middleware = require('../middleware')


router.get('/', function(req,res){
        Campground.find({}, function(err, allCampgrounds){
            if(err){
                console.log(err)
            } else{
                res.render('campgrounds/index', {campgrounds: allCampgrounds, currentUser: req.user});

            }
        })
    
});

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render('campgrounds/new');
    
})

router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
        if(err){
            console.log(err)
        } else {
            res.render('campgrounds/show', {campground: foundCampground});
        }
    })
})

router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name
    var price = req.body.price
    var image = req.body.image
    var desc = req.body.description
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, price: price, image: image, description: desc, author:author};
    
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err)
        } else {
            res.redirect("/campgrounds");
        }
    })
    
})

router.get('/:id/edit',middleware.checkCampgroundOwnership, function(req, res){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash('error', 'Campground not found~')
            } else {
            res.render('campgrounds/edit', {campground: foundCampground}); 
            }
        });
});

router.put('/:id',middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            req.flash('error', 'No permission to edit that camp')
            res.redirect('/campgrounds')
        } else {
            res.redirect('/campgrounds/' + req.params.id)
        }
    })
})

//DESTROY
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/campgrounds')
        } else {
            res.redirect('/campgrounds')
        }
    })
})


//middleware



module.exports = router;