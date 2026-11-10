const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("volume");

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlay = () => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
};

const handlePlayState = () => {
    playBtn.innerText = video.paused ? "Play" : "Pause";
};

const handleMute = () => {
    video.muted = !video.muted;
    muteBtn.innerText = video.muted ? "Unmute" : "Mute";
    volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
    const { value } = event.target;
    if (video.muted) {
        video.muted = false;
        muteBtn.innerText = "Mute";
    }
    volumeValue = Number(value);
    video.volume = volumeValue;
};

// 초 → 00:00:00
const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substring(11, 19);

const handleLoadedMetadata = () => {
    totalTime.innerText = formatTime(Math.floor(video.duration));
};

const handleTimeUpdate = () => {
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
};

// 끝까지 보면 조회수 +1
const handleEnded = () => {
    const { id } = video.dataset;
    fetch(`/api/videos/${id}/views`, { method: "POST" });
};

playBtn.addEventListener("click", handlePlay);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("play", handlePlayState);
video.addEventListener("pause", handlePlayState);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("ended", handleEnded);

// 스크립트보다 메타데이터가 먼저 로드된 경우
if (video.readyState >= 1) {
    handleLoadedMetadata();
}
