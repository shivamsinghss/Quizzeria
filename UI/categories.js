// Music Toggle
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicToggle");
let musicOn = true;

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

// Redirect to quiz page on category click
document.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", () => {
        const category = card.textContent.trim();
        window.location.href = `quiz.html?category=${encodeURIComponent(category)}`;
    });
});
