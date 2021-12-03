const Recipe = require('../models/recipe');

const checkRecipeOwner = async (req, res, next) => {
	if (req.isAuthenticated()) {
		const recipe = await Recipe.findById(req.params.id).exec();
		if (recipe.owner.id.equals(req.user._id)) {
			next();
		} else {
			res.redirect("back");
		}
	} else {
		res.redirect("/login");
	}
}

module.exports = checkRecipeOwner;