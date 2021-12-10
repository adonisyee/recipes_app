//Init variables
const upvoteBtn = document.getElementById('upvote_btn');
const downvoteBtn = document.getElementById('downvote_btn');

//Event Listeners
upvoteBtn.addEventListener('click', async function() {
	const options = {
		method: "POST",
		headers: {
			'content-Type': 'application/json'
		},
		body: JSON.stringify({vote: 'up'})
	}
	await fetch("/recipes/vote", options)
	.then(data => {
		return data.json();
	})
	.then(res => {
		console.log(res);
	})
	.catch(err => {
		console.log(err);
	})
})