var Campground      = require('./models/campground'),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    express         = require('express'),
    Comment         = require("./models/comment"),
    seedDB          = require('./seeds'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    User            = require('./models/users'),
    methodOverride  = require('method-override'),
    flash           = require('connect-flash');
var app             = express();

var commentRoutes       = require('./routes/comments'),
    campgroundRoutes    = require('./routes/campgrounds'),
    indexRoutes         = require('./routes/index');


mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
//seedDB();

//PASSPORT CONFIG
app.use(require('express-session')({
    secret: 'For the Horde!',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error')
    res.locals.success = req.flash('success')
    next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(8080, function(){
    console.log("Portal Opened!");
});





//deprecated code

//Scheme Setup
// var campgroundSchema = new mongoose.Schema({
//     name: String,
//     image: String,
//     description: String
// });

// var Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
//     {
//     name: 'Monkey Hill',
//     image: 'https://www.photosforclass.com/download/flickr-7004537596',
//     description: "This is a huge hill with monkeys. You will die here."
//     },
    
//     function(err, campground){
//         if(err){
//             console.log(err)
//         } else{
//             console.log("New campground created");
//             console.log(campground);
//         }
//     });

// var campgrounds = [
//         {name: 'Salmon Creek', image: 'https://www.photosforclass.com/download/pixabay-1851092?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f2c178a5e4b3ba_960.jpg&user=Pexels'},
//         {name: 'Rocky Rivers', image: 'https://www.photosforclass.com/download/flickr-8243374910'},
//         {name: 'Monkey Hill', image: 'https://www.photosforclass.com/download/flickr-7004537596'},
//         {name: 'Salmon Creek', image: 'https://www.photosforclass.com/download/pixabay-1851092?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f2c178a5e4b3ba_960.jpg&user=Pexels'},
//         {name: 'Rocky Rivers', image: 'https://www.photosforclass.com/download/flickr-8243374910'},
//         {name: 'Monkey Hill', image: 'https://www.photosforclass.com/download/flickr-7004537596'},
//         {name: 'Salmon Creek', image: 'https://www.photosforclass.com/download/pixabay-1851092?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f2c178a5e4b3ba_960.jpg&user=Pexels'},
//         {name: 'Rocky Rivers', image: 'https://www.photosforclass.com/download/flickr-8243374910'},
//         {name: 'Monkey Hill', image: 'https://www.photosforclass.com/download/flickr-7004537596'}
        
//     ];


