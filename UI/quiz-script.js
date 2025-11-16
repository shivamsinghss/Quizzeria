const params = new URLSearchParams(window.location.search);
const category = params.get("category") || "Math";

// Elements
const categoryTitle = document.getElementById("categoryTitle");
const questionContainer = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const feedbackContainer = document.getElementById("feedback");
const scoreContainer = document.getElementById("scoreContainer");
const finalScore = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const soundToggle = document.getElementById("soundToggle");

let soundOn = true;
soundToggle.addEventListener("click", () => {
    soundOn = !soundOn;
    soundToggle.textContent = soundOn ? "🔊 Sound" : "🔇 Sound";
});

// Set category title
categoryTitle.textContent = `Category: ${category}`;

let questions = [];
let currentIndex = 0;
let score = 0;

// Fetch questions
function fetchQuestions() {
    fetch(`https://quizzeria-7n0x.onrender.com/api/questions/random?category=${category}&count=10`)
        .then(res => res.json())
        .then(data => {
            questions = data;
            showQuestion();
        })
        .catch(err => {
            console.error(err);
            questionContainer.textContent = "Failed to load questions. Please try again later.";
        });
}

fetchQuestions();

// Show question
function showQuestion() {
    if (currentIndex >= questions.length) {
        showScore();
        return;
    }

    const q = questions[currentIndex];
    questionContainer.style.opacity = 0;
    optionsContainer.style.opacity = 0;

    setTimeout(() => {
        questionContainer.textContent = `Q${currentIndex + 1}: ${q.question}`;
        questionContainer.style.animation = "fadeIn 0.5s forwards";

        optionsContainer.innerHTML = "";
        let answered = false; // Prevent multiple clicks

        q.options.forEach((opt) => {
            const label = document.createElement("label");
            label.className = "option-label";

            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "option";
            radio.value = opt;

            label.appendChild(radio);
            label.appendChild(document.createTextNode(opt));

            label.addEventListener("click", () => {
                if (!answered) {
                    answered = true;
                    checkAnswer(opt, q.correctAnswer);
                    // Disable all radio buttons
                    optionsContainer.querySelectorAll('input[type="radio"]').forEach(r => r.disabled = true);
                }
            });

            optionsContainer.appendChild(label);
        });

        optionsContainer.style.animation = "fadeInOptions 0.5s forwards";
    }, 200);

    feedbackContainer.textContent = "";
}

// Check answer
function checkAnswer(selected, correct) {
    if (selected === correct) {
        score++;
        feedbackContainer.textContent = "🎉 Correct! Well done!";
        feedbackContainer.style.color = "#27ae60";
        if (soundOn) correctSound.play();
        triggerConfetti();
    } else {
        feedbackContainer.textContent = `❌ Wrong! Correct answer: ${correct}.`;
        feedbackContainer.style.color = "#e74c3c";
        if (soundOn) wrongSound.play();
    }

    setTimeout(() => {
        currentIndex++;
        showQuestion();
    }, 1500);
}

// Show final score
function showScore() {
    questionContainer.textContent = "🎯 Quiz Completed!";
    optionsContainer.innerHTML = "";
    feedbackContainer.textContent = "";
    const final = Math.min(score, questions.length); // Cap score
    finalScore.textContent = `Your Score: ${final} / ${questions.length}`;
    scoreContainer.classList.remove("hidden");
}

// Restart quiz
restartBtn.addEventListener("click", () => {
    currentIndex = 0;
    score = 0;
    scoreContainer.classList.add("hidden");
    fetchQuestions();
});

// ------------------ Confetti Animation ------------------
function triggerConfetti() {
    const confettiContainer = document.createElement("div");
    confettiContainer.className = "confetti-container";
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
        confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
        confettiContainer.remove();
    }, 1500);
}
