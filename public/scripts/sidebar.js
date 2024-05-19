const form = document.getElementById("chat-form");

let participantsArray = [];
const noParticipants = document.getElementById("no-participants");
const participantsList = document.getElementById("participants-list");

form.onsubmit = function (event) {
  event.preventDefault();
  const message = form.elements["chat-input"].value;
  if (message) {
    emitMessage("message", message);
    form.querySelector("input").value = "";
  }
};

function addMessage(message) {
  const chat = document.querySelector(".chat");
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.textContent = message;
  chat.appendChild(messageElement);
}

function createParticipantTile(displayName) {
  const participantTile = document.createElement("div");
  participantTile.classList.add("participant");

  const participantIcon = document.createElement("span");
  participantIcon.className = "material-symbols-outlined";
  participantIcon.textContent = "account_circle";

  const participantName = document.createElement("span");
  participantName.textContent = displayName;

  participantTile.appendChild(participantIcon);
  participantTile.appendChild(participantName);

  return participantTile;
}

function getDisplayNameFromUserId(userId) {
  return userId === socket.id ? `${userId} (you)` : userId;
}

function createParticipantElement(userId) {
  const participantElement = document.createElement("div");
  participantElement.classList.add("participant");
  participantElement.setAttribute("data-user-id", userId);

  const displayName = getDisplayNameFromUserId(userId);
  participantElement.appendChild(createParticipantTile(displayName));

  return participantElement;
}

function addParticipant(userId) {
  const participantElement = createParticipantElement(userId);
  participantsList.appendChild(participantElement);
  participantsArray.push(userId);
  if (participantsArray.length > 1) {
    noParticipants.classList.add("hide");
  }
}

function removeParticipant(userId) {
  const participantElement = participantsList.querySelector(
    `.participant[data-user-id="${userId}"]`
  );
  if (participantElement) {
    participantsList.removeChild(participantElement);
  }
  participantsArray = participantsArray.filter((id) => id !== userId);
  if (participantsArray.length === 0) {
    noParticipants.classList.remove("hide");
  }
}
