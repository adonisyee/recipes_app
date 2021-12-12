//Helper functions 
const sendVote = async (voteType) => {
	const options = {
		method: "POST",
		headers: {
			'content-Type': 'application/json'
		},
	}
	if (voteType === "up") {
		options.body = JSON.stringify({
			voteType: 'up',
			recipeId
		});
	} else if (voteType === "down") {
		options.body = JSON.stringify({
			voteType: 'down',
			recipeId
		});
	} else {
		throw("voteType must be 'up' or 'down'");
	}
	await fetch("/recipes/vote", options)
	.then(data => {
		return data.json();
	})
	.then(res => {
		const response = res.response;
		handleVote(response.score, response.code);
	})
	.catch(err => {
		console.log(err);
	})
}

const handleVote = (newScore, code) => {
	score.innerText = newScore;
	if (code === 0) {
		upvoteBtn.classList.remove('btn-success');
		upvoteBtn.classList.add('btn-outline-success');
		downvoteBtn.classList.add('btn-outline-danger');
		downvoteBtn.classList.remove('btn-danger');
	} else if (code === 1) {
		upvoteBtn.classList.add('btn-success');
		upvoteBtn.classList.remove('btn-outline-success');
		downvoteBtn.classList.add('btn-outline-danger');
		downvoteBtn.classList.remove('btn-danger');
	} else if (code === -1) {
		upvoteBtn.classList.remove('btn-success');
		upvoteBtn.classList.add('btn-outline-success');
		downvoteBtn.classList.remove('btn-outline-danger');
		downvoteBtn.classList.add('btn-danger');
	} else {
		console.log("error in handleVote");
	}
}

//Init variables
const upvoteBtn = document.getElementById('upvote_btn');
const downvoteBtn = document.getElementById('downvote_btn');
const score = document.getElementById('score');

//Event Listeners
upvoteBtn.addEventListener('click', async function() {
	if (isUser) {
		sendVote('up');
	} else {
		window.location.href = "../login";
	}
})
downvoteBtn.addEventListener('click', async function() {
	if (isUser) {
		sendVote('down');
	} else {
		window.location.href = "../login";
	}
})