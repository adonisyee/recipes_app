const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

//Sign up - New 
router.get('/signup', (req, res) => {
	res.render('signup');
})

//Sign up - Create 
router.post('/signup', async (req, res) => {
	try {
		const newUser = await User.register(new User({
			username: req.body.username,
			email: req.body.email
		}), req.body.password);
		console.log(newUser);
		passport.authenticate('local')(req, res, () => {
			res.redirect('/recipes');
		})
		
	} catch (err) {
		console.log(err);
		res.send(err);
	}
})

//Login - Show 
router.get('/login', (req, res) => {
	res.render('login', {referer:req.headers.referer});
})

//Login
router.post('/login', passport.authenticate('local', {failureRedirect: "/login"}), (req, res) => {
    if (req.body.referer && (req.body.referer !== undefined && req.body.referer.slice(-6) !== "/login")) {
        res.redirect(req.body.referer);
    } else {
        res.redirect("/recipes");
    }
});

//Logout
router.get('/logout', (req, res) => {
	req.logout(); 
	res.redirect('/recipes');
})

module.exports = router;
