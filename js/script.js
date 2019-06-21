const start = document.getElementById('start');

const homepage = document.getElementById('homepage');
const questions = document.getElementById('questions');
const results = document.getElementById('results');

const openQuestions = document.getElementById('openQuestions');
const choices = document.getElementById('choices');

const partyList = document.getElementById('partyList');
const nextPage = document.getElementById('nextPage');

const question = document.getElementById('question');
const statement = document.getElementById('statement');

const backButton = document.getElementById('backButton');

const isImportant = document.getElementById('isImportant');

const pro = document.getElementById('pro');
const none = document.getElementById('none');
const contra = document.getElementById('contra');
const skip = document.getElementById('skip');
const arrowNext = document.getElementById('arrowNext');

const match = document.getElementById('match');

const largeParties = document.getElementById('largeParties');
const secularParties = document.getElementById('secularParties');
const noParties = document.getElementById('noParties');

const firstPartyElement = document.getElementById('firstPartyElement');
const secondPartyElement = document.getElementById('secondPartyElement');
const thirdPartyElement = document.getElementById('thirdPartyElement');

const otherResults = document.getElementById('otherResults');

let answers = [];
let counter = 0;
let choicesStep = false;

let choicesLoaded = false;

window.onload = function () {
    startPage();
};

// This is the function that starts onload that makes the homepage visable.
function startPage() {
    homepage.style.display = 'block';
    questions.style.display = 'none';
    results.style.display = 'none';

    backButton.style.display = 'none';

    document.getElementById('questionCount').innerHTML = subjects.length;

    start.addEventListener('click', startQuiz);

    addValues();
}

function addValues() {
    // This for loop gives all the parties a count and a mark property with a default value.
    for (let i = 0; i < parties.length; i++) {
        let party = parties[i];
        party['count'] = 0;
        party['marked'] = false;
    }
}

// This function contains the question display and calls the 'setStatement()' function to place the chosen aswer.
function startQuiz() {

    homepage.style.display = 'none';
    questions.style.display = 'block';
    results.style.display = 'none';

    backButton.style.display = 'block';

    openQuestions.style.display = 'block';
    choices.style.display = 'none';

    pro.addEventListener('click', setAnswer);
    none.addEventListener('click', setAnswer);
    contra.addEventListener('click', setAnswer);
    skip.addEventListener('click', setAnswer);

    backButton.addEventListener('click', goBack);

    setStatement();
}

// This function makes it possible to navigate back through the questions.
function goBack() {
    // when the counter is 0 it means that there are no more questions to go back to so the homepage has to be shown.
    if (counter === 0) {
        // back to homepage
        startPage();

        // when the counter is the same number as there are subjects, it means that you wanna go back to the last question from the choices screen.
    } else if (counter === subjects.length) {
        startQuiz();

        // if both conditions are not true, then the counter loses 1 so you go back just 1 question.
    } else {
        counter--;
        startQuiz();
        
        let previousAnswer = answers[counter].position;
        document.getElementById(previousAnswer).classList.add("active");
    }
}

// This function checks the eventListner and the important checkbox.
// It adds the id of the pressed button (pro,none,contra or skip) and the 'checked' to the answers array.
function setAnswer(value) {
    answers[counter] = {
        "position": value.target.id,
        "isImportant": isImportant.checked
    };
    
    counter++;
    setStatement();
}

// This function contains a if else to check by the counter which question needs to be displayed, if its the last one there will be linked to showChoices().
function setStatement() {
    if (counter === subjects.length && choicesStep === false) {
        showChoices();
        
    } else if (counter === subjects.length && choicesStep === true) {
        counter = subjects.length - 1;
        setStatement();
    } else if (counter < subjects.length) {
        question.innerHTML = counter + 1 + '. ' + subjects[counter].title;
        statement.innerHTML = subjects[counter].statement;

        removeActiveClass();
        if (counter !== 0 && answers[counter] !== undefined){
            addActiveClass();
        }

        choicesStep = false;
        checkStatement();
    }
}

function addActiveClass() {
    switch (answers[counter].position) {
        case "pro":
            pro.classList.add("active");
        break;
        case "none":
            none.classList.add("active");
        break;
        case "contra":
            contra.classList.add("active");
        break;
    }
}

function removeActiveClass() {
    pro.classList.remove("active");
    none.classList.remove("active");
    contra.classList.remove("active");
}

// This function makes it possible to remember if a question is marked as important.
function checkStatement() {
    if (answers[counter] === undefined) {
        isImportant.checked = false;
    } else {
        isImportant.checked = answers[counter].isImportant;
    }
}

// This function create a page where there has to be chosen a preference for at least 3 parties.
function showChoices() {
    choicesStep = true;

    openQuestions.style.display = 'none';
    choices.style.display = 'block';

    backButton.addEventListener('click', goBack);

    question.innerHTML = 'Welke partijen wilt u meenemen in het resultaat?';
    statement.innerHTML = 'U kunt kiezen voor grote partijen, daarbij nemen we de partijen mee die in de peilingen op minimaal één zetel staan. U kunt kiezen voor seculiere partijen. Maak tenminste een selectie van drie partijen.';

    nextPage.addEventListener('click', result);

    createParties();

    largeParties.addEventListener('click', largePartiesSelection);
    secularParties.addEventListener('click', secularPartiesSelection);
    noParties.addEventListener('click', noPartiesSelection);
}

// This function creates the list of parties that are available, it also gives them checkboxes.
function createParties() {
    if (!choicesLoaded) {

        for (let i = 0; i < parties.length; i++) {
            const currIndex = i;

            let createLi = document.createElement('li');
            createLi.className = "list-group-item";

            let checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('id', parties[i].name);
            checkbox.onclick = function () {
                setParty(currIndex);
            };
            createLi.appendChild(checkbox);

            let liContent = document.createTextNode(parties[i].name);
            createLi.appendChild(liContent);

            partyList.appendChild(createLi);
        }
        choicesLoaded = true;
    }
}

// This function creates a selection of all parties with more then 1 seat.
function largePartiesSelection() {
    for (let i = 0; i < parties.length; i++) {
        let party = parties[i];
        if (party.size >= 1) {
            party.marked = true;

            let partyName = party.name;
            document.getElementById(partyName).checked = true;
        }
    }
}

// This function creates a selection of all secular parties.
function secularPartiesSelection() {
    for (let i = 0; i < parties.length; i++) {
        let partySecular = parties[i].secular;
        if (partySecular) {
            let party = parties[i];
            party.marked = true;

            let partyName = party.name;
            document.getElementById(partyName).checked = true;
        }
    }
}

// This function clears the selection.
function noPartiesSelection() {
    for (let i = 0; i < parties.length; i++) {
        let party = parties[i];
        party['marked'] = false;

        let partyErase = parties[i].name;

        document.getElementById(partyErase).checked = false;
    }
}

// This function contains a check to see if the party is added to a array.
function setParty(index) {
    // parties[index].marked = !parties[index].marked;
    if (parties[index].marked) {
        parties[index].marked = false;
    } else {
        parties[index].marked = true;
    }
}

// This function creates a page where the results are displayed.
function result() {
    let markCounter = 0;
    for (let k = 0; k < parties.length; k++) {
        if (parties[k].marked) {
            markCounter++;
        }
    }

    if (markCounter >= 3) {

        choicesStep = false;

        homepage.style.display = 'none';
        questions.style.display = 'none';
        results.style.display = 'block';

        backButton.addEventListener('click', goBack);

        checkAnswer();
        showResult();
    } else {
        alert('Selecteer ten minste 3 partijen.');
    }
}

// Resets the count for all parties.
function resetPartyCount() {
	for (let i = 0; i < parties.length; i++) {
		parties[i].count = 0;
	}
}

// When the last answer is filled, this function looks at all the parties which answers are the same.
function checkAnswer() {

	//To make sure the values wouldn't stack.
	resetPartyCount();

	// this loop separate the answers in the array.
	for (let i = 0; i < answers.length; i++) {
		let answer = answers[i];
		let subjectParties = subjects[i].parties;
		
		// Loops trough all the parties of the subjects separately.
		for (let j = 0; j < subjectParties.length; j++) {
			let subjectParty = subjectParties[j];
			let answerPosition = answer.position;
			
			// Checks if position of the party is the same as the given answer, when it's not, the next party will be checked.
			if (subjectParty.position !== answerPosition) {
				continue;
			}
			
			let foundParty = null;
			let subjectPartyName = subjectParty.name;
			
			// The loop searches for a party that has the same name.
			for (let k = 0; k < parties.length; k++) {
				if (parties[k].name === subjectPartyName) {
					foundParty = parties[k];
					break;
				}
			}

			// If the party is not found in the loop before, this condition makes sure that the loop will start the next loop.
			if (foundParty === null) {
				continue;
			}

			let answerIsImportant = answer.isImportant;

			// Checks if the important checkbox is checked. When it is, there will be added another count.
			if (answerIsImportant) {
				foundParty.count++;
			}

			// When this part of the function has been reached, it means that the party has the same answer as the one given and the name of the party is the same as the name in the "parties" array where the count is stored.
			foundParty.count++;
		}

	}
}


// This function creates the result page
function showResult() {

    otherResults.innerHTML = '';

    let markedParties = [];
    // Go trough all of the parties.
    for (let i = 0; i < parties.length; i++) {

        const party = parties[i];
        // If a party is marked, we want to add it to markedParties.
        if (party.marked) {
            // markedParties[i] = party;
            markedParties.push(party);
        }

    }

    // This inside sort function makes sure all the data is sorted by the count from high to low value.
    markedParties.sort(function (a, b) {
        return b.count - a.count;
    });

    match.innerHTML = '1# ' + markedParties[0].name + ' met: ' + markedParties[0].count + ' punten';

    // These are the first 3 value's from the array which means that these had the most similar answers.
    firstPartyElement.innerHTML = '1# ' + markedParties[0].name + ' met:  ' + markedParties[0].count + ' punten';
    secondPartyElement.innerHTML = '2# ' + markedParties[1].name + ' met: ' + markedParties[1].count + ' punten';
    thirdPartyElement.innerHTML = '3# ' + markedParties[2].name + ' met: ' + markedParties[2].count + ' punten';

    for (let i = 3; i < markedParties.length; i++) {
        let li = document.createElement('li');
        li.innerHTML = markedParties[i].name + ' met: ' + markedParties[i].count + ' punten';

        // The li will be placed inside the ul (otherResults).
        otherResults.appendChild(li);
    }
}