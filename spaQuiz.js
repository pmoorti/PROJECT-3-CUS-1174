document.addEventListener('DOMContentLoaded', function() {
    fetchQuizDataAndRender("questionsQ1", 1, "#initialScreen");

    document.getElementById('startQuizButton').addEventListener('click', () => {
        const name = document.querySelector('#name').value;
        console.log(name);

        currentQuizId = document.querySelector('#quiz-selection').value === "1" ? "questionsQ1" : "questionsQ2";
        console.log(currentQuizId);
        fetchQuizDataAndRender(currentQuizId, questionIndex, "#quiz_view1");
    });

    document.querySelector('#display-data').addEventListener('click', (e) => {
        handleViewEvents(e);
    });
});
let questionIndex = 1;
let currentQuizId = "questionsQ1";
let counter = 0;
let isAnswerCorrect = null; 

const handleViewEvents = (e) => {
    if (e.target.type !== 'radio') {
        e.preventDefault();
    }

    if (e.target.dataset.viewaction == "startQuiz") {
        const name = document.querySelector('#name').value;
        console.log(name);

        currentQuizId = document.querySelector('#quiz-selection').value === "1" ? "questionsQ1" : "questionsQ2";
        console.log(currentQuizId);
        fetchQuizDataAndRender(currentQuizId, questionIndex, "#quiz_view1");
    }

    if (e.target.dataset.viewaction == "continue") {
        questionIndex++;
        console.log(questionIndex);
        if (questionIndex >= 5 && counter / 5 >= 0.7) {
            renderFinalScreen(currentQuizId, questionIndex, "#finalScreenPassed");
        } else if (questionIndex >= 5 && counter / 5 < 0.7) {
            renderFinalScreen(currentQuizId, questionIndex, "#finalScreenFailed");
        } else {
            fetchQuizDataAndRender(currentQuizId, questionIndex, "#quiz_view" + questionIndex);
        }
    }

    if (e.target.dataset.viewaction == "return") {
        questionIndex = 0;
        fetchQuizDataAndRender("questionsQ1", 1, "#initialScreen");
    }

    if (e.target.dataset.viewaction == "re-take") {
        questionIndex = 1;
        fetchQuizDataAndRender(currentQuizId, 1, "#quiz_view1");
    }

    if (e.target.type == 'radio') {
        if (e.target.value == document.querySelector('#form').dataset.correctChoice) {
            isAnswerCorrect = true;
            console.log(isAnswerCorrect);
        } else {
            isAnswerCorrect = false;
            console.log(isAnswerCorrect);
        }
    }
};


const fetchQuizDataAndRender = async (quizId, questionIndex, view) => {
    const apiEndpoint = 'https://my-json-server.typicode.com/pmoorti/PROJECT-3-CUS-1174';
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    console.log(data);
    console.log(view);
    const html = renderView(data, view);
    document.querySelector('#display-data').innerHTML = html;
}

const renderView = (data, view) => {
    const source = document.querySelector(view).innerHTML;
    const template = Handlebars.compile(source);
    return template(data);
};

const renderFinalScreen = (quizId, questionIndex, view) => {
    fetchQuizDataAndRender(quizId, questionIndex, view);
};
