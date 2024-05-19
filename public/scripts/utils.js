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

function trimDisplayName(displayName, maxSize = 15) {
  return displayName.length > maxSize
    ? `${displayName.slice(0, maxSize)}...`
    : displayName;
}

function isComponentVisible(component) {
  return !component.classList.contains("hide");
}

function hideComponent(component) {
  component.classList.add("hide");
}

function showComponent(component) {
  component.classList.remove("hide");
}

function getParticipantIcon(size) {
  const participantIcon = document.createElement("span");
  participantIcon.className = "material-symbols-outlined";
  participantIcon.textContent = "account_circle";
  if (size) {
    participantIcon.style.fontSize = size;
  }
  return participantIcon;
}

function getFormattedTimestamp(time) {
  const parsedTime = new Date(time);
  return parsedTime.toLocaleTimeString("en-in", {
    hourCycle: "h24",
    timeStyle: "short",
  });
}
