const video = document.querySelector("#custom-video-player");
const playPauseBtn = document.querySelector("#play-pause-btn");
const playPauseImg = document.querySelector("#play-pause-img");
const progressBarContainer = document.querySelector(".progress-bar");
const progressBarFill = document.querySelector("#progress-bar-fill");

progressBarContainer.addEventListener("click", seek);
// progressBarContainer (the full track) and progressBarFill (the inner bar) are kept as two separate variables. They initially shared one name, which meant clicking to seek was resizing the whole container instead of just the fill. Splitting them fixed the bug and matches the container/fill split in the CSS.

function seek(event) {
    const barWidth = progressBarContainer.clientWidth;
    const clickX = event.offsetX;
    video.currentTime = (clickX / barWidth) * video.duration;
}

video.removeAttribute("controls");
video.addEventListener("timeupdate", updateProgressBar);

function togglePlayPause() {
  if (video.paused || video.ended) {
    video.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  } else {
    video.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
  }
}

function updateProgressBar() {
  const value = (video.currentTime / video.duration) * 100;
  progressBarFill.style.width = value + "%";
}