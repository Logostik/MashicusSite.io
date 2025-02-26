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
