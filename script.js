function showQuestion(n) {
    // Получаем все элементы с классом "question"
    const questions = quizContainer.getElementsByClassName('question');

    // Проверяем, что вопросы существуют
    if (!questions || questions.length === 0) {
        console.error("Вопросы не найдены!");
        return;
    }

    // Скрываем все вопросы
    for (let i = 0; i < questions.length; i++) {
        questions[i].style.display = 'none';
    }

    // Показываем текущий вопрос
    if (questions[n]) {
        questions[n].style.display = 'block';
    } else {
        console.error(`Вопрос с индексом ${n} не найден!`);
        return;
    }

    // Управление видимостью кнопок "Назад" и "Вперед"
    if (n === 0) {
        // Если это первый вопрос, скрываем кнопку "Назад"
        prevButton.style.display = 'none';
    } else {
        // Иначе показываем кнопку "Назад"
        prevButton.style.display = 'inline-block';
    }

    if (n === questions.length - 1) {
        // Если это последний вопрос, скрываем кнопку "Вперед" и показываем "Завершить квиз"
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    } else {
        // Иначе показываем кнопку "Вперед" и скрываем "Завершить квиз"
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
}
