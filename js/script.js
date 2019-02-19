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

answers = [];

var counter = 0;

window.onload = function()
{
	startPage();
}

// Deze functie zorgt voor het inladen van de homepage
function startPage()
{
	homepage.style.display = 'block';
	questions.style.display = 'none';
	results.style.display = 'none';

	document.getElementById('questionCount').innerHTML = subjects.length;
	start.addEventListener('click', startQuiz);
}

// Deze functie zorgt voor het inladen de het vragen scherm
function startQuiz()
{

	homepage.style.display = 'none';
	questions.style.display = 'block';
	results.style.display = 'none';

	pro.addEventListener('click', answer);
	none.addEventListener('click', answer);
	contra.addEventListener('click', answer);
	skip.addEventListener('click', answer);

	last.addEventListener('click', back);
	
	getStatement();
}
// Deze functie zorgt voor de result pagina
function result()
{
	homepage.style.display = 'none';
	questions.style.display = 'none';
	results.style.display = 'block';	
}
// Deze functie zorgt ervoor dat je terug door de vragen heen kan
function back()
{
	if (counter === 0) {
		startPage();
	} else {
		counter--;
		getStatement();
	}
}

// Deze functie bekijkt welk antwoord ingevuld
function answer(value)
{
	switch (value.target.id)
	{
		case "pro":
			answers[counter] = value.target.id;
			console.log(answers);
			break;		

		case "none":
			answers[counter] = value.target.id;
			console.log(answers);
		break;

		case "contra":
			answers[counter] = value.target.id;
			console.log(answers);
		break;

		case "skip":
			answers[counter] = value.target.id;
			console.log(answers);
		break;
	}
	counter++;
	console.log(counter);
	getStatement();
}

// Hier wordt de statement opgehaald
// ook word hier gekeken welke vraag opgehaald word. Als het de laatste is wordt er gelinked naar de resultaten.

function getStatement()
{
	if (counter === subjects.length) {
		console.log("Hier word nog aan gewerkt");
		result();
	} else if (counter <= subjects.length) {
		question.innerHTML = counter + 1 + '. ' + subjects[counter].title;
	} else {
		question.innerHTML = "Something went wrong";
	}
}	



