const playBtn = document.getElementById("playBtn");
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicToggle");
let musicOn = true;

// Redirect to categories page on Play Now click
playBtn.addEventListener("click", () => {
    window.location.href = "categories.html";
});

// Toggle music on/off
function toggleMusic() {
    if (musicOn) {
        bgMusic.pause();
        musicBtn.textContent = "🔇";
    } else {
        bgMusic.play();
        musicBtn.textContent = "🔊";
    }
    musicOn = !musicOn;
}
