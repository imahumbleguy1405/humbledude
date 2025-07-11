// Countdown Timer
function updateCountdown() {
  const targetDate = new Date("2025-12-31T23:59:59").getTime();
  const now = new Date().getTime();
  const distance = targetDate - now;
  const countdown = document.getElementById("countdown");

  if (distance < 0) {
    countdown.innerHTML = "🔴 Heist in Progress!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdown.innerHTML = `🎭 Heist Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Music Player Setup
const player = document.getElementById("music-player");
const trackSelector = document.getElementById("track-selector");
const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");
const progressBar = document.getElementById("progress");
const timeDisplay = document.getElementById("time-display");

const playlist = [
  "music/Layer Cake.mp3",
  "music/Beneath the Mask.mp3",
  "music/Tokyo Daylight.mp3",
  "music/Last Surprise.mp3",
  "music/Life Will Change.mp3",
  "music/Mementos_ Upper Area.mp3",
  "music/No More What Ifs.mp3",
  "music/No More What Ifs -i.mp3",
  "music/Royal Days.mp3",
  "music/So Happy World.mp3",
  "music/The Whims of Fate.mp3",
  "music/Colors Flying High.mp3"
];

let currentTrackIndex = 0;

trackSelector.addEventListener("change", () => {
  player.src = trackSelector.value;
  player.play();
  currentTrackIndex = playlist.indexOf(trackSelector.value);
});
playBtn.addEventListener("click", () => player.play());
pauseBtn.addEventListener("click", () => player.pause());

player.addEventListener("ended", () => {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  player.src = playlist[currentTrackIndex];
  trackSelector.value = playlist[currentTrackIndex];
  player.play();
});
player.addEventListener("timeupdate", () => {
  if (player.duration) {
    const progressPercent = (player.currentTime / player.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    const minutes = Math.floor(player.currentTime / 60);
    const seconds = Math.floor(player.currentTime % 60);
    timeDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
});

// Joker Header Hover
const jokerHeaderImg = document.getElementById("joker-header-img");
jokerHeaderImg.addEventListener("mouseenter", () => {
  jokerHeaderImg.src = "cutinjoker.gif";
});
jokerHeaderImg.addEventListener("mouseleave", () => {
  jokerHeaderImg.src = "jokercutin.png";
});

// Mask Drop Animation on Load
window.addEventListener("load", () => {
  const mask = document.getElementById("mask-drop");
  mask.style.top = "100px";
});

// Popup Cut-in + Sound
const popup = document.getElementById("popup");
const popupImage = popup.querySelector(".popup-image");
const images = [
  "CUTINSJAVA/joker.png",
  "CUTINSJAVA/makoto.png",
  "CUTINSJAVA/yusuke.png",
  "CUTINSJAVA/anne.png",
  "CUTINSJAVA/haru.png",
  "CUTINSJAVA/ryuji.png",
  "CUTINSJAVA/bitchInheat.png"
  
];
const cutinSound = new Audio("music/perssona5cutinsound.mp3");

function showPopup(targetUrl) {
  const randomImage = images[Math.floor(Math.random() * images.length)];
  popupImage.src = randomImage;
  popup.classList.add("active");
  document.body.classList.add("noscroll");
  cutinSound.currentTime = 0;
  cutinSound.play();

  setTimeout(() => {
    popup.classList.remove("active");
    document.body.classList.remove("noscroll");
    window.location.href = targetUrl;
  }, 1500);
}

popup.addEventListener("click", () => {
  popup.classList.remove("active");
  document.body.classList.remove("noscroll");
});

// Attach Cut-in to All Menu Links
document.querySelectorAll(".menu-button").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    const targetUrl = link.getAttribute("href");
    showPopup(targetUrl);
  });
});
