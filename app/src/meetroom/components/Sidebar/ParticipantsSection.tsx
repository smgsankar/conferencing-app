import { ParticipantIcon } from "../../../icons/ParticipantIcon";
import { useMeetRoomState } from "../../../store/hooks";
import { getDisplayNameForUser } from "../../../utils/helpers";
import { SectionWithHeader } from "./SectionWithHeader";

export const ParticipantsSection = () => {
  const { currentUser, users } = useMeetRoomState();

  return (
    <SectionWithHeader title="Participants">
      <div className="sidebar-list">
        {!users.length && <div className="no-data">No participants yet...</div>}
        {users.map((user) => (
          <div className="participant" data-user-id={user}>
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
