const express = require('express');
const router = express.Router({mergeParams: true});
const Comment = require('../models/comment');
const Recipe = require('../models/recipe');
const isLoggedIn = require('../utils/isLoggedIn');
const checkCommentOwner = require('../utils/checkCommentOwner');

//New comment show route
router.get("/new", isLoggedIn, (req, res) => {
	res.render("comments_new", {recipeId: req.params.id})
})

//Create route
router.post("/", isLoggedIn, async (req, res) => {
	try {
		const newComment = await Comment.create({
			user: {
				id: req.user._id,
				username: req.user.username
			},
			text: req.body.text,
			recipeId: req.body.recipeId
		})
		console.log(newComment);
		res.redirect(`/recipes/${req.body.recipeId}`);
	} catch (err) {
		console.log(err);
		res.redirect(`/recipes/${req.body.recipeId}`);
	}
})

//Edit Route
router.get("/:commentId/edit", checkCommentOwner, async (req, res) => {
	try {
		const comment = await Comment.findById(req.params.commentId).exec();
		console.log("comment:", comment);
		res.render("comments_edit", {recipeId: req.params.id, comment});
	} catch (err) {
		console.log(err);
		res.send("Broke comment EDIT GET")
	}
})

//Update Route
router.put("/:commentId", checkCommentOwner, async (req, res) => {
	try {
		const comment = await Comment.findByIdAndUpdate(req.params.commentId, {text: req.body.text}, {new: true}).exec();
		console.log(comment);
		res.redirect(`/recipes/${req.params.id}`);
	} catch (err) {
		console.log(err);
		res.send("Broke comment UPDATE PUT")
	}
})

//Delete Route
router.delete("/:commentId", checkCommentOwner, async (req, res) => {
	try {
		const comment = await Comment.findByIdAndDelete(req.params.commentId).exec();
		console.log(comment);
		res.redirect(`/recipes/${req.params.id}`);
	} catch (err) {
		console.log(err);
		res.send("Broken comment DELETE")
	}
})

module.exports = router;