let stream;
const socket = io();

const NO_AUDIO_ERROR = "No audio track in screen sharing stream";

function toast(message) {
  const toast = document.querySelector(".toast");
  toast.innerHTML = message;
  toast.classList.remove("hide");
  setTimeout(() => {
    toast.classList.add("hide");
  }, 3000);
}

function toastError(message) {
  console.error(message);
  toast(message);
}

function playNotification() {
  const notificationAlert = new Audio("/assets/notification.mp3");
  notificationAlert.play();
}

const presentBtn = document.getElementById("present-btn");
const cancelPresentationBtn = document.getElementById(
  "cancel-presentation-btn"
);

const chatBtn = document.getElementById("chat-btn");
const participantsBtn = document.getElementById("participants-btn");

const sidebar = document.querySelector(".sidebar");
const chat = document.querySelector(".chat");
const participants = document.querySelector(".participants");

function stopStream() {
  if (!stream) return;
  stream.getTracks().forEach((track) => track.stop());
}

function stopPresentation() {
  stopStream();
  // socket.emit("stop-presentation");
  presentBtn.classList.remove("hide");
  cancelPresentationBtn.classList.add("hide");
}

function present() {
  navigator.mediaDevices
    .getDisplayMedia({
      audio: { noiseSuppression: false },
      video: { displaySurface: "browser" },
      monitorTypeSurfaces: "exclude",
    })
    .then((str) => {
      const audioTracks = str.getAudioTracks();
      if (audioTracks.length == 0) {
        toastError(NO_AUDIO_ERROR);
      }
      // socket.emit("start-presentation", { stream });
      presentBtn.classList.add("hide");
      cancelPresentationBtn.classList.remove("hide");
      str.getTracks()[0].onended = stopPresentation;
      stream = str;
    })
    .catch((err) => {
      toastError(err.message);
    });
}

function isComponentVisible(component) {
  return !component.classList.contains("hide");
}

function hideComponent(component) {
  component.setAttribute("data-active", "false");
  component.classList.add("hide");
}

function showComponent(component) {
  component.classList.remove("hide");
}

function toggleChat() {
  if (isComponentVisible(chat)) {
    chatBtn.setAttribute("data-active", "false");
    hideComponent(chat);
    hideComponent(sidebar);
  } else {
    chatBtn.setAttribute("data-active", "true");
    if (isComponentVisible(sidebar)) {
      showComponent(chat);
      hideComponent(participants);
      participantsBtn.setAttribute("data-active", "false");
    } else {
      showComponent(chat);
      showComponent(sidebar);
    }
  }
}

function toggleParticipants() {
  if (isComponentVisible(participants)) {
    participantsBtn.setAttribute("data-active", "false");
    hideComponent(participants);
    hideComponent(sidebar);
  } else {
    participantsBtn.setAttribute("data-active", "true");
    if (isComponentVisible(sidebar)) {
      showComponent(participants);
      hideComponent(chat);
      chatBtn.setAttribute("data-active", "false");
    } else {
      showComponent(participants);
      showComponent(sidebar);
    }
  }
}

function collapseAside() {
  hideComponent(chat);
  chatBtn.setAttribute("data-active", "false");
  hideComponent(participants);
  participantsBtn.setAttribute("data-active", "false");
  hideComponent(sidebar);
}

document.querySelectorAll(".close-aside").forEach((btn) => {
  btn.addEventListener("click", collapseAside);
});

presentBtn.addEventListener("click", present);

cancelPresentationBtn.addEventListener("click", stopPresentation);

chatBtn.addEventListener("click", toggleChat);
participantsBtn.addEventListener("click", toggleParticipants);
