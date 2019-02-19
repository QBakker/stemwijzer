const title = document.getElementById('title');

const start = document.getElementById('start');

const homepage = document.getElementById('homepage');
const questions = document.getElementById('questions');
const results = document.getElementById('results');

const question = document.getElementById('question');
const statement = document.getElementById('statement');

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
	// result();
}

// Deze functie zorgt voor het inladen van de homepage en de bijbehoordende elementen.
function startPage()
{
	homepage.style.display = 'block';
	questions.style.display = 'none';
	results.style.display = 'none';

	document.getElementById('questionCount').innerHTML = subjects.length;
	start.addEventListener('click', startQuiz);
}

// Deze functie zorgt voor het inladen de het vragen scherm en de elementen die daar bij horen.
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
// Deze functie zorgt voor de result pagina en de elementen die hier bij horen.
function result()
{
	homepage.style.display = 'none';
	questions.style.display = 'none';
	results.style.display = 'block';	
}
// Deze functie zorgt ervoor dat je terug door de vragen kan navigeren.
// Ook word er gecheckt of het de eerste vraag is als dat zo is dan word er terug gestuurd naar de homepage
function back()
{
	if (counter === 0) {
		startPage();
	} else {
		counter--;
		getStatement();
	}
}

// Deze functie bekijkt welk antwoord ingevuld door de eventlistener uit te lezen.
// De waarde word dan gecheckt en vervolgens in opgeslagen in de 'answers' array opgeslagen 
// op de juiste plek door de counter value die meegegeven word.

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
		statement.innerHTML = subjects[counter].statement;
	} else {
		question.innerHTML = "Something went wrong, please try again later";
	}
}	



