const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
	category: String,
	title: String,
	serves: String,
	prep: Number,
	cook: Number,
	description: String,
	image: String,
	ingredient: [String],
	quantity: [String],
	prep_step: [String],
	cook_step: [String],
	owner: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

recipeSchema.index({
	'$**': 'text'
});

module.exports = mongoose.model("Recipe", recipeSchema);