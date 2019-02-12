title = document.getElementById('title');

const start = document.getElementById('start');

const homepage = document.getElementById('homepage');
const questions = document.getElementById('questions');
const results = document.getElementById('results');

const options = document.getElementsByClassName('options');

const question = document.getElementById('question');

const last = document.getElementById('last');

const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const option3 = document.getElementById('option3');
const option4 = document.getElementById('option4');

anwser = [];

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

	last.addEventListener('click', startPage);

	subjects.forEach(function(subject){
		a = subject['title'];
	})
	console.log(a);

	question.innerHTML = a;
}

function back()
{

}	

// de functie om naar de volgende vraag te gaan
function nextQuestion() 
{

}
