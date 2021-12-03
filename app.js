///======================
//IMPORTS 
//=======================
//NPM imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

//Config import
const config = require('./config');

//Route imports
const mainRoutes = require('./routes/main');
const recipeRoutes= require('./routes/recipes');
const commentRoutes = require('./routes/comments');
const authRoutes = require('./routes/auth');

//Model imports
const Recipe = require('./models/recipe');
const Comment = require('./models/comment');
const User = require('./models/user');

///======================
//DEVELOPMENT 
//=======================
//Morgan
app.use(morgan('tiny'));

//Seed the DB
//const seed = require('./utils/seed');
//seed();

///======================
//CONFIG 
//=======================
//Connect to DB
mongoose.connect(config.db.connection);

//Body Parser Config
app.use(bodyParser.urlencoded({extended:true}));

//Express Config
app.set('view engine', 'ejs');
app.use(express.static("public"));

//Express Session Config
app.use(expressSession({
	secret: "ewiothfbkajasdhfweliqfnakjkadghqegav",
	resave: false,
	saveUninitialized: false
}));

//Method Override Config
app.use(methodOverride('_method'));

//Passport Config 
app.use(passport.initialize());
app.use(passport.session()); //Allows persistent sessions
passport.serializeUser(User.serializeUser()); //What data should be stored in session
passport.deserializeUser(User.deserializeUser()); //Get user data from stored session
passport.use(new LocalStrategy(User.authenticate())); //Use local strategy

//Current User Middleware Config 
app.use((req, res, next) => {
	res.locals.user = req.user;
	next();
})

//Route Config
app.use("/", mainRoutes);
app.use("/", authRoutes);
app.use("/recipes", recipeRoutes);
app.use("/recipes/:id/comments", commentRoutes);


///======================
//LISTEN
//=======================
app.listen(3000, ()=> {
	console.log('Yelp Clone running on port 3000.');
})