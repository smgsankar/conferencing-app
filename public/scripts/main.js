let stream;

const NO_AUDIO_ERROR = "No audio track in screen sharing stream";

const presentBtn = document.getElementById("present-btn");
const cancelPresentationBtn = document.getElementById(
  "cancel-presentation-btn"
);

const presentation = document.getElementById("presentation");

const chatBtn = document.getElementById("chat-btn");
const participantsBtn = document.getElementById("participants-btn");

const sidebar = document.querySelector(".sidebar");
const chat = document.getElementById("chat");
const participants = document.getElementById("participants");

function stopStream() {
  if (!stream) return;
  stream.getTracks().forEach((track) => track.stop());
}

function stopPresentation() {
  stopStream();
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
      presentBtn.classList.add("hide");
      cancelPresentationBtn.classList.remove("hide");
      str.getTracks()[0].onended = stopPresentation;
      stream = str;
    })
    .catch((err) => {
      toastError(err.message);
    });
}

function deactivateComponent(component) {
  hideComponent(component);
  component.setAttribute("data-active", "false");
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

window.addEventListener("beforeunload", stopStream);
