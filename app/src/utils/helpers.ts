import { User } from "../store/state.types";

export function toast(message: string) {
  const toast = document.querySelector(".toast")!;
  toast.innerHTML = message;
  toast.classList.remove("hide");
  setTimeout(() => {
    toast.classList.add("hide");
  }, 3000);
}

export function toastError(message: string) {
  console.error(message);
  toast(message);
}

export function playNotification() {
  const notificationAlert = new Audio("/assets/notification.mp3");
  notificationAlert.play();
}

export function trimDisplayName(displayName: string, maxSize = 15) {
  return displayName.length > maxSize
    ? `${displayName.slice(0, maxSize)}...`
    : displayName;
}

export function getDisplayNameForUser(user: User, currentUser: User | null) {
  const trimmedDisplayName = trimDisplayName(user.name);
  return user.socketId === currentUser?.socketId
    ? `${trimmedDisplayName} (you)`
    : trimmedDisplayName;
}

export function getFormattedTimestamp(time: string) {
  const parsedTime = new Date(time);
  return parsedTime.toLocaleTimeString("en-in", {
    hourCycle: "h24",
    timeStyle: "short",
  });
}
