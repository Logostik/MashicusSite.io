const quizContainer = document.getElementById('quiz');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const submitButton = document.getElementById('submit');
const resultsContainer = document.getElementById('results');

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
    // Добавьте остальные вопросы здесь
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
    for (let i = 0; i < questions.length; i++) {
        questions[i].style.display = 'none';
    }

    // Показываем текущий вопрос
    questions[n].style.display = 'block';

    // Управление кнопками
    if (n === 0) {
        prevButton.disabled = true; // Отключаем кнопку "Назад" на первом вопросе
    } else {
        prevButton.disabled = false; // Включаем кнопку "Назад" на остальных вопросах
    }

    if (n === questions.length - 1) {
        nextButton.style.display = 'none'; // Скрываем кнопку "Вперед" на последнем вопросе
        submitButton.style.display = 'inline-block'; // Показываем кнопку "Завершить квиз"
    } else {
        nextButton.style.display = 'inline-block'; // Показываем кнопку "Вперед"
        submitButton.style.display = 'none'; // Скрываем кнопку "Завершить квиз"
    }
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
