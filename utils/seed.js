const Recipe = require("../models/recipe");
const Comment = require("../models/comment");

const recipe_seeds = [
	{
		category: "other",
		title: "Lamb Chops with Rosemary and Garlic",
		serves: "2-3",
		prep: 45,
		cook: 30,
		description:"Lamb chops are such a simple and satisfying meal. Marinate them in rosemary and garlic, sear them quickly on the stovetop, and dinner is served. Great for a romantic date night or a dinner party.",
		ingredient: ["Lamb Chops","Rosemary","Garlic","Salt","Pepper","Olive Oil"],
		quantity: ["1.5 lbs","to taste","to taste","to taste","to taste","to taste"],
		prep_step: ["Marinade the lamb chops in a mixture of rosemary, garlic, salt, pepper, and olive oil for at least 30 min, up to 24 hours in the fridge.","Let the chops sit at room temperature for 30 min before cooking."],
		cook_step: ["Cook the lamb chops in a pan over medium-high heat with olive oil. It shouldn't take long to reach a temperature of medium-rare."],
		image: "https://www.simplyrecipes.com/thmb/sN5DV4PUSbqNW4lxBNjnTUvmaFk=/2000x1333/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2013__02__Rosemary-Lamb-Chops-LEAD-2-4b70775441df47848c0b4352446bac77.jpg"
	},
	{
		category: "beef",
		title: "Angel's Angus Beef",
		serves: "5",
		prep: 50,
		cook: 20,
		description:"Angel's Angus Beef is the best!",
		ingredient: ["Steak","Butter","Garlic","Salt","Pepper","Olive Oil", "Rosemary"],
		quantity: ["5","5 tbsp","","","",""],
		prep_step: ["Preheat pan to medium heat","season steak with salt and pepper", "When the pan is hot, coat it with olive oil"],
		cook_step: ["Lay a steak in the pan (make sure to lay away from you)", "Add 1 tbsp butter, some rosemary, and some garlic to the heated pan", "Sear both sides", "Base the steak with the butter", "Once cooked to desired temperature, take the steak out of the pan and let it rest for 10 min"],
		image: "https://www.seriouseats.com/thmb/uGGwEqPZf7PzhES1ZCAqHLgCbG8=/1500x844/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2015__05__Anova-Steak-Guide-Sous-Vide-Photos15-beauty-159b7038c56a4e7685b57f478ca3e4c8.jpg"
	},
	{
		category: "vegan",
		title: "Angel's Salad",
		serves: "4",
		prep: 20,
		cook: 0,
		description:"A nice side salad",
		ingredient: ["Lettuce","Spinach","Bell Peppers","Onion","Apple","Dressing", "Tomato"],
		quantity: ["1 head","A bunch","2","1/2","1","to taste", "2"],
		prep_step: ["chop up all the vegetables", "add dressing"],
		cook_step: [],
		image: "https://recipes.heart.org/-/media/AHA/Recipe/Recipe-Images/Mediterranean-Salad.jpg?h=636&iar=0&mw=890&w=890&hash=7CFBC1AF5742A79DB42AFCFB4B6FA43D"
	}
]

const seed = async () => {
	//delete recipes and comments in the DB
	await Recipe.deleteMany();
	console.log('deleted all the recipes')
	await Comment.deleteMany();
	console.log('deleted all the comments')
	
	/*for (const recipe_seed of recipe_seeds) {
		let recipe = await Recipe.create(recipe_seed);
		console.log("created recipe:", recipe.title);
		await Comment.create({
			text: "I love this recipe!",
			user: "mynamejeff",
			recipeId: recipe._id
		})
		console.log("created a new comment");
	}*/
}

module.exports = seed;