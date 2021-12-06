///======================
//IMPORTS 
//=======================
//NPM imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

//Config import
try {
	var config = require('./config');
} catch (e) {
	console.log("Could not import config. Probably means you are not working locally.");
	console.log(e);
}


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
try{
	mongoose.connect(config.db.connection);
} catch (e) {
	console.log("Could not connect using config. Probably means you are not running locally.");
	mongoose.connect(process.env.DB_CONNECTION_STRING);
}


//Body Parser Config
app.use(bodyParser.urlencoded({extended:true}));

//Express Config
app.set('view engine', 'ejs');
app.use(express.static("public"));

//Express Session Config
app.use(expressSession({
	secret: process.env.ES_SECRET || config.expressSession.secret,
	resave: false,
	saveUninitialized: false
}));

//Method Override Config
app.use(methodOverride('_method'));

//Flash Config
app.use(flash());

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
app.listen(process.env.PORT || 3000, ()=> {
	console.log('Recipe app running.');
})