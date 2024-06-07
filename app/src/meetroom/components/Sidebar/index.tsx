import { useSidebarState } from "../../../hooks/useSidebarState";
import { SidebarContentState } from "../../../utils/constants";
import { ChatSection } from "./ChatSection";
import { ParticipantsSection } from "./ParticipantsSection";

export const Sidebar = () => {
  const { sidebarContent } = useSidebarState();

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
