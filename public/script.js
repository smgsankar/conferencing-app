const video = document.getElementById("video");
const audio = document.getElementById("audio");

document.getElementById("test").addEventListener("click", function () {
  navigator.mediaDevices
    .getDisplayMedia({ audio: { noiseSuppression: false } })
    .then((stream) => {
      video.srcObject = stream;
      audio.srcObject = stream;
    })
    .catch((err) => {
      console.log(err);
    });
});

document.getElementById("play-video").addEventListener("click", function () {
  audio.pause();
  video.play();
});

document.getElementById("play-audio").addEventListener("click", function () {
  video.pause();
  audio.play();
});
