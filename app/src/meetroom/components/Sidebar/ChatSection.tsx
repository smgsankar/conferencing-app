import { useEffect, useRef } from "react";
import { SendIcon } from "../../../icons/SendIcon";
import { useSidebarState } from "../../../hooks/useSidebarState";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { SectionWithHeader } from "./SectionWithHeader";
import { socket } from "../../../utils/socket";
import { ParticipantIcon } from "../../../icons/ParticipantIcon";
import { getFormattedTimestamp, trimDisplayName } from "../../../utils/helpers";

export const ChatSection = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { messages } = useSidebarState();
  const { currentUser } = useCurrentUser();

  const getMessageSenderName = (sender: string) =>
    sender === currentUser?.socketId ? "You" : trimDisplayName(sender);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = inputRef.current;
    if (input?.value) {
      socket.emit("message", input.value);
      input.value = "";
    }
  };

  useEffect(() => {
    if (!messages.length || !currentUser) return;

    if (messages[messages.length - 1].sender !== currentUser.socketId) return;

    const messagesContainer = document.querySelector(".sidebar-list")!;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, [currentUser, messages]);

  return (
    <SectionWithHeader title="Chat">
      <div className="sidebar-list">
        {!messages.length && (
          <div className="no-data" id="no-messages">
            No messages yet...
          </div>
        )}
        {messages.map((message) => (
          <div key={`${message.sender}_${message.time}`} className="message">
            <ParticipantIcon />
            <div className="message-body">
              <div className="message-info">
                <span className="sender-name">
                  {getMessageSenderName(message.sender)}
                </span>
                <span className="message-time">
                  {getFormattedTimestamp(message.time)}
                </span>
              </div>
              <div className="message-content">{message.content}</div>
            </div>
          </div>
        ))}
      </div>
      <form id="chat-form" onSubmit={onSubmit}>
        <input
          autoFocus
          type="text"
          id="chat-input"
          ref={inputRef}
          name="chat-input"
          autoComplete="off"
          placeholder="Type something..."
        />
        <button id="chat-submit" type="submit">
          <SendIcon />
        </button>
      </form>
    </SectionWithHeader>
  );
};
