const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentQuestion = 0;

const quizQuestions = [
    {
        question: "Какой язык программирования используется для создания веб-страниц?",
        answers: {
            a: "Java",
            b: "Python",
            c: "JavaScript"
        },
        correctAnswer: "c"
    },
    {
        question: "Какой тег используется для создания заголовка в HTML?",
        answers: {
            a: "<p>",
            b: "<h1>",
            c: "<div>"
        },
        correctAnswer: "b"
    },
    {
        question: "Какой метод используется для вывода данных в консоль в JavaScript?",
        answers: {
            a: "console.log()",
            b: "print()",
            c: "alert()"
        },
        correctAnswer: "a"
    },
    {
        question: "Какой символ используется для однострочного комментария в JavaScript?",
        answers: {
            a: "//",
            b: "/*",
            c: "#"
        },
        correctAnswer: "a"
    },
    {
        question: "Какой элемент HTML используется для создания ссылки?",
        answers: {
            a: "<a>",
            b: "<link>",
            c: "<href>"
        },
        correctAnswer: "a"
    },
    {
        question: "Какой метод используется для добавления элемента в конец массива в JavaScript?",
        answers: {
            a: "push()",
            b: "pop()",
            c: "shift()"
        },
        correctAnswer: "a"
    },
    {
        question: "Какой тег используется для создания таблицы в HTML?",
        answers: {
            a: "<table>",
            b: "<tr>",
            c: "<td>"
        },
        correctAnswer: "a"
    },
    {
        question: "Какой оператор используется для сравнения по значению и типу в JavaScript?",
        answers: {
            a: "==",
            b: "===",
            c: "="
        },
        correctAnswer: "b"
    },
    {
        question: "Какой метод используется для преобразования строки в число в JavaScript?",
        answers: {
            a: "parseInt()",
            b: "toString()",
            c: "toNumber()"
        },
        correctAnswer: "a"
    },
    {
        question: "Какой тег используется для создания списка в HTML?",
        answers: {
            a: "<ul>",
            b: "<ol>",
            c: "<li>"
        },
        correctAnswer: "a"
    }
];

function buildQuiz() {
    const output = [];

    quizQuestions.forEach((currentQuestion, questionNumber) => {
        const answers = [];

        for (letter in currentQuestion.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                </label>`
            );
        }

        output.push(
            `<div class="question" id="question${questionNumber}">
                <div class="question-text">${currentQuestion.question}</div>
                <div class="answers">${answers.join('')}</div>
            </div>`
        );
    });

    quizContainer.innerHTML = output.join('');
    showQuestion(currentQuestion);
}

function showQuestion(n) {
    const questions = quizContainer.getElementsByClassName('question');

    // Скрываем все вопросы
    for (let i = 0; i < questions.length; ++i) {
        if(n != i){
            questions[i].style.display = 'none';
        }
    }
    // Показываем текущий вопрос
    questions[n].style.display = 'block';

    // Управление видимостью кнопок "Назад" и "Вперед"
    if (n === 0) {
        prevButton.style.display = 'none';
    } else {
        prevButton.style.display = 'inline-block';
    }

    if (n === questions.length - 1) {
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    } else {
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
}

function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;

    quizQuestions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
            answerContainers[questionNumber].style.color = 'green';
        } else {
            answerContainers[questionNumber].style.color = 'red';
        }
    });

    resultsContainer.innerHTML = `${numCorrect} из ${quizQuestions.length}`;
}

buildQuiz();

prevButton.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
});

nextButton.addEventListener('click', () => {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
});

submitButton.addEventListener('click', showResults);
