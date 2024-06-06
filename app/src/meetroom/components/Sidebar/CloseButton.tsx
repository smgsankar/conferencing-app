import { CloseIcon } from "../../../icons/CloseIcon";
import { useMeetRoomState } from "../../../store/hooks";
import { SidebarContentState } from "../../../utils/constants";

export const CloseButton = () => {
  const { setSidebarContent } = useMeetRoomState();

  const onClose = () => setSidebarContent(SidebarContentState.None);

  return (
    <button type="button" className="close-aside" onClick={onClose}>
      <CloseIcon />
    </button>
  );
};
