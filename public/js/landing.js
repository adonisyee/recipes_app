//Helper Functions
async function typeText() {
	if (i < title.length) {
		document.getElementById('landing_title').innerHTML += title.charAt(i);
		i++;
		setTimeout(typeText, speed);
	} else {
		document.getElementById('landing_intro').style.opacity = '1';
	}
}

//Init variables
let i = 0;
let title = "Grandma's Recipes";
let speed = 100;

//Event Listener
window.addEventListener('load', typeText);

