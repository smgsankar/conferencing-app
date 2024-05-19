const form = document.getElementById("chat-form");

let participantsArray = [];
const noParticipants = document.getElementById("no-participants");
const participantsList = document.getElementById("participants-list");

const noMessages = document.getElementById("no-messages");
const chatContent = document.getElementById("chat-content");

form.onsubmit = function (event) {
  event.preventDefault();
  const message = form.elements["chat-input"].value;
  if (message) {
    emitMessage(message);
    form.querySelector("input").value = "";
  }
};

function hideNoMessagesIfShown() {
  if (!noMessages.classList.contains("hide")) {
    noMessages.classList.add("hide");
  }
}

function createMessageElement(messageObject) {
  const { content, sender, time } = messageObject;
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");

  const participantIcon = getParticipantIcon("32px");
  messageElement.appendChild(participantIcon);

  const messageBody = document.createElement("div");
  messageBody.className = "message-body";

  const messageInfo = document.createElement("div");
  messageInfo.className = "message-info";

  const senderName = document.createElement("span");
  senderName.className = "sender-name";
  senderName.textContent = trimDisplayName(sender ?? "You");
  messageInfo.appendChild(senderName);

  const msgTime = document.createElement("span");
  msgTime.className = "message-time";

  const secondsLeft = 60 - new Date().getSeconds();
  setTimeout(() => {
    msgTime.textContent = getFormattedTimestamp(time);
  }, secondsLeft * 1000);

  msgTime.textContent = "now";
  messageInfo.appendChild(msgTime);

  messageBody.appendChild(messageInfo);

  const messageContent = document.createElement("div");
  messageContent.className = "message-content";
  messageContent.textContent = content;

  messageBody.appendChild(messageContent);

  messageElement.appendChild(messageBody);

  return messageElement;
}

function addOwnMessage(messageObject) {
  const messageElement = createMessageElement(messageObject);
  chatContent.appendChild(messageElement);
  hideNoMessagesIfShown();
}

function addMessage(messageObject) {
  playNotification();
  const messageElement = createMessageElement(messageObject);
  chatContent.appendChild(messageElement);
  hideNoMessagesIfShown();
}

function createParticipantTile(displayName) {
  const participantTile = document.createElement("div");
  participantTile.classList.add("participant");

  const participantIcon = getParticipantIcon();

  const participantName = document.createElement("span");
  participantName.textContent = displayName;

  participantTile.appendChild(participantIcon);
  participantTile.appendChild(participantName);

  return participantTile;
}

function getDisplayNameFromUserId(userId) {
  const trimmedDisplayName = trimDisplayName(userId);
  return userId === socket.id
    ? `${trimmedDisplayName} (you)`
    : trimmedDisplayName;
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
