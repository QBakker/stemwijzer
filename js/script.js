const title = document.getElementById('title');

const start = document.getElementById('start');

const homepage = document.getElementById('homepage');
const questions = document.getElementById('questions');
const results = document.getElementById('results');

const options = document.getElementsByClassName('options');

const question = document.getElementById('question');

const last = document.getElementById('last');

const pro = document.getElementById('pro');
const none = document.getElementById('none');
const contra = document.getElementById('contra');
const skip = document.getElementById('skip');

anwser = [];

var count = 0;

window.onload = function()
{
	startPage();
}

// inladen van de homepage
function startPage()
{
	homepage.style.display = 'block';
	questions.style.display = 'none';
	results.style.display = 'none';

	document.getElementById('questionCount').innerHTML = subjects.length;
	start.addEventListener('click', startQuiz);
}

// inladen van de het vragen scherm
function startQuiz()
{
	var a = null;
	homepage.style.display = 'none';
	questions.style.display = 'block';
	results.style.display = 'none';

	pro.addEventListener('click', awnser);
	none.addEventListener('click', awnser);
	contra.addEventListener('click', awnser);
	skip.addEventListener('click', awnser);

	last.addEventListener('click', startPage);

	question.innerHTML = count + 1 + '. ' + a;



}


function awnser(value)
{
	// console.log(value.target.id);
	// console.log(none);
	// console.log(contra);
	// console.log(skip);
	
	switch (value.target.id)
	{
		case "pro":
		console.log("Eens");
		break;
		case "none":
		console.log("Geen van beide");
		break;
		case "contra":
		console.log("oneens");
		break;
		case "skip":
		console.log("skip");
	}
}

function counter()
{
	if (anwserClick = true) {

		count ++;
	} else if (anserClick = false ) {

		count --;
	} else {
		
	}
}

// Hier halen we de statement op
function getStatement()
{
	 subjects.forEach(function(subject){
		a = subject['title'];
	})
}

function back()
{

}	

// de functie om naar de volgende vraag te gaan
function nextQuestion() 
{

}
