const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
const Comment = require('../models/comment');
const isLoggedIn = require('../utils/isLoggedIn');
const checkRecipeOwner = require('../utils/checkRecipeOwner')

//Index route
router.get("/", async (req, res) => {
	try {
		const recipes = await Recipe.find().exec();
		res.render("recipes", {recipes});
	} catch (err) {
		console.log(err);
		res.send("You broke it... /index");
	}
})

//Create Route
router.post("/", isLoggedIn, async (req, res) => {
	const category = req.body.category.toLowerCase();
	const newRecipe = {
		category,
		title: req.body.title,
		serves: req.body.serves,
		prep: req.body.prep,
		cook: req.body.cook,
		description: req.body.description,
		image: req.body.image,
		ingredient: req.body.ingredient,
		quantity: req.body.quantity,
		prep_step: req.body.prep_step,
		cook_step: req.body.cook_step,
		owner: {
			id: req.user._id,
			username: req.user.username
		}
	}
	try {
		const recipe = await Recipe.create(newRecipe);
		console.log(recipe);
		res.redirect("/recipes/"+recipe._id);
	} catch (err) {
		console.log(err);
		res.send("You broke it... /recipes POST");
	}
})

//New Route
router.get("/new", isLoggedIn, (req, res) => {
	res.render("recipes_new");
})

router.get("/search", async (req, res) => {
	try {
		const recipes = await Recipe.find({
			$text: {
				$search: req.query.term
			}
		})
		res.render("recipes", {recipes});
	} catch (err) {
		console.log(err);
		res.send("You broke it ...SEARCH");
	}
})

//Category Route
router.get("/category/:category", async (req, res) => {
	const validCategories = ['beef', 'pork', 'chicken', 'fish', 'vegetarian', 'vegan', 'other'];
	if (validCategories.includes(req.params.category.toLowerCase())) {
		const recipes = await Recipe.find({category: req.params.category.toLowerCase()}).exec();
		res.render("recipes", {recipes});
	} else {
		res.send("Please enter a valid category")
	}
})

//Show Route
router.get("/:id", async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.id).exec();
		const comments = await Comment.find({recipeId: req.params.id});
		res.render("recipes_show", {recipe, comments});
	} catch (err) {
		console.log(err);
		res.send("You broke it... /recipes/:id");
	}
})

//Edit Route
router.get("/:id/edit", checkRecipeOwner, async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.id).exec();
		res.render("recipes_edit", {recipe})
	} catch (err) {
		console.log(err);
		res.render("you broke it... /recipes/:id/edit");
	}
})

//Update Route
router.put("/:id", checkRecipeOwner, async (req, res) => {
	const category = req.body.category.toLowerCase();
	const updatedRecipe = {
		category,
		title: req.body.title,
		serves: req.body.serves,
		prep: req.body.prep,
		cook: req.body.cook,
		description: req.body.description,
		image: req.body.image,
		ingredient: req.body.ingredient,
		quantity: req.body.quantity,
		prep_step: req.body.prep_step,
		cook_step: req.body.cook_step
	}
	try {
		const recipe = await Recipe.findByIdAndUpdate(req.params.id, updatedRecipe, {new: true}).exec();
		console.log(recipe);
		res.redirect(`/recipes/${req.params.id}`);
	} catch (err) {
		console.log(err);
		res.send("You broke it... /recipes/:id PUT");
	}
})

//Delete Route
router.delete('/:id', checkRecipeOwner, async (req, res) => {
	try {
		const recipe = await Recipe.findByIdAndDelete(req.params.id).exec();
		console.log("Deleted:", recipe);
		res.redirect("/recipes");
	} catch (err) {
		console.log(err);
		res.send("You broke it... /recipes/:id DELETE");
	}	
})

module.exports = router;