const title = document.getElementById('title');

const start = document.getElementById('start');

const homepage = document.getElementById('homepage');
const questions = document.getElementById('questions');
const results = document.getElementById('results');

const question = document.getElementById('question');
const statement = document.getElementById('statement');

const questionBack = document.getElementById('questionBack');
const resultBack = document.getElementById('resultBack');

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

	pro.addEventListener('click', setAnswer);
	none.addEventListener('click', setAnswer);
	contra.addEventListener('click', setAnswer);
	skip.addEventListener('click', setAnswer);

	questionBack.addEventListener('click', back);
	
	setStatement();
}

// Deze functie zorgt voor de result pagina en de elementen die hier bij horen.
function result()
{
	homepage.style.display = 'none';
	questions.style.display = 'none';
	results.style.display = 'block';

	resultBack.addEventListener('click', back);	
	checkAnswer();
}



// Hier wordt de statement opgehaald
// ook word hier gekeken welke vraag opgehaald word. Als het de laatste is wordt er gelinked naar de resultaten.

function setStatement()
{
	if (counter === subjects.length) {
		result();
	} else if (counter <= subjects.length) {
		question.innerHTML = counter + 1 + '. ' + subjects[counter].title;
		statement.innerHTML = subjects[counter].statement;
	} else {
		question.innerHTML = "Something went wrong, please try again later";
	}
}

// Deze functie zorgt ervoor dat je terug door de vragen kan navigeren.
// Ook word er gecheckt of het de eerste vraag is als dat zo is dan word er terug gestuurd naar de homepage
function back()
{
	if (counter === 0) {
		startPage();
	} else {
		counter--;
		setStatement();
	}
}

function checkAnswer ()
{

	// Hier pak je alle antwoorden apart op
	for (var i = 0; i < subjects.length; i++) {
		
		var answer = answers[i];

		// als er op skip gedrukt is gaat hij door naar het volgende antwoord
		if (answer === "skip") {
			// continue zorgt ervoor dat hij alle code die verder uitgevoerd gaat worden in deze loop niet behandeld word
			// maar direct doorgaat naar het volgende antwoord in de answers array.
			continue;
		}

		var subject = subjects[i];

		// Hier pak je iedere partie apart uit de array van het subject
		for (var j = 0; j < subject.parties.length; j++) {

			var subjectParty = subject.parties[j];
			var subjectPartyPosition = subjectParty.position;

			// Hier check je of het opgegeven antwoord gelijk is aan een van de partijen. aangezien 'subjectPartyPosition' vervangen word
			// door alle partys op hun beurt.
			if (subjectPartyPosition === answer) {

				var subjectPartyName = subjectParty.name;

				var foundParty = {};

				// Hier worden alle partijen bekeken of de naam van de partij overeenkomt met de naam van het subject.
				for (var k = 0; k < parties.length; k++) {
					var party = parties[k];
					if (party.name === subjectParty.name) {
						// hier wordt de party in opgeslagen waarvan de naam gelijk is aan de naam van het subject.
						foundParty = party;
						// hier word de huidige for loop beeindigd. de resterende for loops blijven wel doorgaan. 
						// De code hieronder blijft doorgaan.
						break;
					}
				}
				// Als er geen partij zou zijn word de functie beeindigd, dit is handig om foutmeldingen te omzeilen.
				if (foundParty.length === 0) {
					continue;
				}

				// Hier word bekeken of er al een property bestaat genaamd "count".
				var hasCountProperty = foundParty.hasOwnProperty("count");

				// Als de property wel bestaat wil je het verhogen.
				if (hasCountProperty) {
					foundParty.count ++;
				// Als de property er nog niet is dus "false" dan word hij aangemaakt door de waarde op 1 te zetten.
				} else {
					foundParty['count'] = 1;
				}

			}
		}
	}
}

// Deze functie bekijkt welk antwoord ingevuld door de eventlistener uit te lezen.
// De waarde word dan gecheckt en vervolgens in opgeslagen in de 'answers' array opgeslagen 
// op de juiste plek door de counter value die meegegeven word.

function setAnswer(value)
{
	answers[counter] = value.target.id;
	
	// console.log(answers);
	
	counter++;
	
	setStatement();
}
	



