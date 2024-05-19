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
