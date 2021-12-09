//Helper Functions
async function typeText() {
	if (i < title.length) {
		document.getElementById('landing_title').innerHTML += title.charAt(i);
		i++;
		setTimeout(typeText, speed);
	} else {
		landing_intro.style.transition = "opacity 2s";
		landing_intro.style.setProperty("-webkit-transition", "opacity 2s");
		landing_intro.style.setProperty("-moz-transition", "opacity 2s");
		document.getElementById('landing_intro').style.opacity = '1';
	}
}

//Init variables
let i = 0;
let title = "Grandma's Recipes";
let speed = 100;
let landing_intro = document.getElementById('landing_intro');

//Event Listener
window.addEventListener('load', typeText);

