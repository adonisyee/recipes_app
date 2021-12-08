//Helper Functions
function typeText() {
	if (i < title.length) {
		document.getElementById('landing-title').innerHTML += title.charAt(i);
		i++;
		setTimeout(typeText, speed);
	}
}

//Init variables
let i = 0;
let title = "Grandma's Recipes";
let speed = 100;

//Event Listener
window.addEventListener('load', typeText);

