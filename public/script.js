let socket;

document.getElementById("user-tiles").addEventListener("click", function () {
  navigator.mediaDevices
    .getDisplayMedia({ audio: { noiseSuppression: false } })
    .then((stream) => {
      console.log('==> ', stream.getAudioTracks());
    })
    .catch((err) => {
      console.log(err);
    });
});

function playNotification() {
  const notificationAlert = new Audio("/assets/notification.mp3");
  notificationAlert.play();
}
