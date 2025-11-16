// ------------------ Music Toggle ------------------
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicToggle");
let musicOn = true;

if (musicBtn) {
    musicBtn.addEventListener("click", () => {
        if (musicOn) {
            bgMusic.pause();
            musicBtn.textContent = "🔇";
        } else {
            bgMusic.play();
            musicBtn.textContent = "🔊";
        }
        musicOn = !musicOn;
    });
}

// ------------------ Quiz ------------------
const params = new URLSearchParams(window.location.search);
const category = params.get("category") || "Math";

let questions = [];
let currentIndex = 0;
let score = 0;

// Elements
const questionContainer = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const feedbackContainer = document.getElementById("feedback");
const scoreContainer = document.getElementById("scoreContainer");
const finalScore = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");

// Fetch questions
fetch(`https://quizzeria-7n0x.onrender.com/api/questions/random?category=${category}&count=10`)
    .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
    })
    .then(data => {
        questions = data;
        showQuestion();
    })
    .catch(err => {
        console.error(err);
        questionContainer.textContent = "Failed to load questions. Please try again later.";
    });

// Show current question
function showQuestion() {
    if (currentIndex >= questions.length) {
        showScore();
        return;
    }

    const q = questions[currentIndex];
    questionContainer.textContent = `Q${currentIndex + 1}: ${q.question}`;
    optionsContainer.innerHTML = "";
    feedbackContainer.textContent = "";

    q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "btn option-btn";
        btn.textContent = opt;
        btn.addEventListener("click", () => checkAnswer(opt, q.correctAnswer));
        optionsContainer.appendChild(btn);
    });
}

// Check answer
function checkAnswer(selected, correct) {
    if (selected === correct) {
        score++;
        feedbackContainer.textContent = "🎉 Correct! Well done!";
        feedbackContainer.style.color = "#00ff00";
    } else {
        feedbackContainer.textContent = `❌ Wrong! Correct answer: ${correct}. Keep trying!`;
        feedbackContainer.style.color = "#ff5555";
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
    if (finalScore) finalScore.textContent = `Your Score: ${score} / ${questions.length}`;
    if (scoreContainer) scoreContainer.classList.remove("hidden");
}

// Restart quiz
if (restartBtn) {
    restartBtn.addEventListener("click", () => {
        currentIndex = 0;
        score = 0;
        scoreContainer.classList.add("hidden");
        fetch(`https://quizzeria-7n0x.onrender.com/api/questions/random?category=${category}&count=10`)
            .then(res => res.json())
            .then(data => {
                questions = data;
                showQuestion();
            });
    });
}
