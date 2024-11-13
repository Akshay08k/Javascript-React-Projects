document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn");
    const nextBtn = document.getElementById("next-btn");
    const restartBtn = document.getElementById('restart-btn');
    const questionContainer = document.getElementById('question-container');
    const questionText = document.getElementById('question-text');
    const choicesList = document.getElementById('choices-list');
    const resultContainer = document.getElementById('result-container');
    const scoreDisplay = document.getElementById('score');

    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;

    // Fetch questions from API
    fetch("https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple")
        .then(res => res.json())
        .then(data => {
            questions = data.results.map(item => ({
                question: item.question,
                choices: [...item.incorrect_answers, item.correct_answer].sort(() => Math.random() - 0.5),
                answer: item.correct_answer
            }));
        });

    startBtn.addEventListener("click", startQuiz);
    nextBtn.addEventListener("click", () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    });
    restartBtn.addEventListener("click", restartQuiz);

    function startQuiz() {
        startBtn.classList.add("hidden");
        resultContainer.classList.add("hidden");
        questionContainer.classList.remove("hidden");
        currentQuestionIndex = 0;
        score = 0;
        showQuestion();
    }

    function showQuestion() {
        nextBtn.classList.add("hidden");
        questionText.textContent = questions[currentQuestionIndex].question;
        choicesList.innerHTML = "";
        questions[currentQuestionIndex].choices.forEach(choice => {
            const li = document.createElement("li");
            li.textContent = choice;
            li.addEventListener("click", () => selectAnswer(li, choice));
            choicesList.appendChild(li);
        });
    }

    function selectAnswer(li, choice) {
        const correctAnswer = questions[currentQuestionIndex].answer;
        if (choice === correctAnswer) {
            score++;
            li.classList.add("correct");
        } else {
            li.classList.add("incorrect");
        }
        Array.from(choicesList.children).forEach(item => item.removeEventListener("click", () => selectAnswer(li, choice)));
        nextBtn.classList.remove("hidden");
    }

    function showResult() {
        questionContainer.classList.add("hidden");
        resultContainer.classList.remove("hidden");
        scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}`;
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        resultContainer.classList.add("hidden");
        showQuestion();
    }
});
