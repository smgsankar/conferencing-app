import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useSidebarState } from "../../../hooks/useSidebarState";
import { ParticipantIcon } from "../../../icons/ParticipantIcon";
import { getDisplayNameForUser } from "../../../utils/helpers";
import { SectionWithHeader } from "./SectionWithHeader";
import "./sidebar.css";

export const ParticipantsSection = () => {
  const { users } = useSidebarState();
  const { currentUser } = useCurrentUser();

  return (
    <SectionWithHeader title="Participants">
      <div className="sidebar-list">
        {!users.length && <div className="no-data">No participants yet...</div>}
        {users.map((user) => (
          <div
            className="participant"
            data-user-id={user.socketId}
            key={user.socketId}
          >
            <div className="participant">
              <ParticipantIcon />
              <span>{getDisplayNameForUser(user, currentUser)}</span>
            </div>
          </div>
        ))}
      </div>
    </SectionWithHeader>
  );
};
