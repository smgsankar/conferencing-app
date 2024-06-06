import { useRecoilState } from "recoil";
import { CancelPresentationIcon } from "../../icons/CancelPresentationIcon";
import { ChatBubbleIcon } from "../../icons/ChatBubbleIcon";
import { PeopleIcon } from "../../icons/PeopleIcon";
import { PresentToAllIcon } from "../../icons/PresetToAllIcon";
import { meetRoomStateAtom } from "../../store/atoms";
import { SidebarContentState } from "../../utils/constants";
import { toastError } from "../../utils/helpers";

export const Footer = () => {
  const [meetRoomState, setMeetRoomState] = useRecoilState(meetRoomStateAtom);
  const { sidebarContent, isPresenting } = meetRoomState;

  const toggleSidebarContent = (incomingState: SidebarContentState) =>
    setMeetRoomState((prevState) => ({
      ...prevState,
      sidebarContent:
        prevState.sidebarContent === incomingState
          ? SidebarContentState.None
          : incomingState,
    }));

  const stopPresentation = () => {
    setMeetRoomState((prevState) => ({
      ...prevState,
      isPresenting: false,
    }));
  };

  const onPresent = () => {
    navigator.mediaDevices
      .getDisplayMedia({
        audio: { noiseSuppression: false },
        video: { displaySurface: "browser" },
      })
      .then((str) => {
        str.getTracks()[0].onended = stopPresentation;
        setMeetRoomState((prevState) => ({
          ...prevState,
          isPresenting: true,
        }));
      })
      .catch((err) => {
        toastError(err.message);
      });
  };

  const onParticipantsClick = () => {
    toggleSidebarContent(SidebarContentState.Participants);
  };

  // todo: update logic to toggle chat sidebar on mobile/smaller screens
  // and open chat modal and focus on chat input on larger screens
  const onChatClick = () => {
    toggleSidebarContent(SidebarContentState.Chat);
  };

  const isChatActive = sidebarContent === SidebarContentState.Chat;
  const isParticipantsActive =
    sidebarContent === SidebarContentState.Participants;

  return (
    <footer>
      {isPresenting ? (
        <button
          type="button"
          className="meet-action"
          onClick={stopPresentation}
        >
          <CancelPresentationIcon />
        </button>
      ) : (
        <button type="button" className="meet-action" onClick={onPresent}>
          <PresentToAllIcon />
        </button>
      )}
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
    </footer>
  );
};
