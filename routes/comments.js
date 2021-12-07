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
		req.flash('success', 'Comment added!');
		res.redirect(`/recipes/${req.body.recipeId}`);
	} catch (err) {
		console.log(err);
		req.flash('error', 'Error adding comment.')
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
		req.flash('success', 'Comment updated!');
		res.redirect(`/recipes/${req.params.id}`);
	} catch (err) {
		console.log(err);
		req.flash('error', 'Error updating comment.')
		res.redirect(`/recipes/${req.params.id}`);
	}
})

//Delete Route
router.delete("/:commentId", checkCommentOwner, async (req, res) => {
	try {
		const comment = await Comment.findByIdAndDelete(req.params.commentId).exec();
		req.flash('success', 'Comment deleted!');
		res.redirect(`/recipes/${req.params.id}`);
	} catch (err) {
		console.log(err);
		req.flash('error', 'Error deleting comment');
		res.redirect(`/recipes/${req.params.id}`);
	}
})

module.exports = router;