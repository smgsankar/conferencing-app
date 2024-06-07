import { CancelPresentationIcon } from "../../icons/CancelPresentationIcon";
import { ChatBubbleIcon } from "../../icons/ChatBubbleIcon";
import { PeopleIcon } from "../../icons/PeopleIcon";
import { PresentToAllIcon } from "../../icons/PresetToAllIcon";
import { SidebarContentState } from "../../utils/constants";
import { EndCallIcon } from "../../icons/EndCallIcon";
import { CopyButton } from "./CopyButton";
import { useMeetRoomState } from "../../hooks/useMeetRoomState";
import { useSidebarState } from "../../hooks/useSidebarState";

export const Footer = () => {
  const { displayStream, togglePresentation } = useMeetRoomState();
  const { sidebarContent, setSidebarContent } = useSidebarState();

  const toggleSidebarContent = (incomingState: SidebarContentState) => {
    setSidebarContent(
      sidebarContent === incomingState
        ? SidebarContentState.None
        : incomingState
    );
  };

  const onParticipantsClick = () => {
    toggleSidebarContent(SidebarContentState.Participants);
  };

  // todo: update logic to toggle chat sidebar on mobile/smaller screens
  // and open chat modal and focus on chat input on larger screens
  const onChatClick = () => {
    toggleSidebarContent(SidebarContentState.Chat);
  };

  const isPresenting = displayStream !== null;
  const isChatActive = sidebarContent === SidebarContentState.Chat;
  const isParticipantsActive =
    sidebarContent === SidebarContentState.Participants;

  return (
    <footer>
      <div id="copy-meet-info" className="meet-action-container">
        <CopyButton />
      </div>
      <div id="media-actions" className="meet-action-container">
        {isPresenting ? (
          <button
            data-active
            type="button"
            className="meet-action"
            onClick={togglePresentation}
          >
            <CancelPresentationIcon />
          </button>
        ) : (
          <button
            type="button"
            className="meet-action"
            onClick={togglePresentation}
          >
            <PresentToAllIcon />
          </button>
        )}
        <button type="button" className="meet-action" id="leave-call-btn">
          <EndCallIcon />
        </button>
      </div>
      <div id="sidebar-actions" className="meet-action-container">
        <button
          type="button"
          className="meet-action"
          onClick={onParticipantsClick}
          data-active={isParticipantsActive}
        >
          <PeopleIcon />
        </button>
        <button
          type="button"
          className="meet-action"
          onClick={onChatClick}
          data-active={isChatActive}
        >
          <ChatBubbleIcon />
        </button>
      </div>
    </footer>
  );
};
