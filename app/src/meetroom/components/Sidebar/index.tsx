import { useMeetRoomState } from "../../../store/hooks";
import { SidebarContentState } from "../../../utils/constants";
import { ChatSection } from "./ChatSection";
import { ParticipantsSection } from "./ParticipantsSection";

export const Sidebar = () => {
  const { sidebarContent } = useMeetRoomState();

  if (sidebarContent === SidebarContentState.None) return null;

  return (
    <aside className="sidebar">
      {sidebarContent === SidebarContentState.Participants && (
        <ParticipantsSection />
      )}
      {sidebarContent === SidebarContentState.Chat && <ChatSection />}
    </aside>
  );
};
