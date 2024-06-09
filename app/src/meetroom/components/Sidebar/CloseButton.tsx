import { useSidebarState } from "../../../hooks/useSidebarState";
import { CloseIcon } from "../../../icons/CloseIcon";
import { SidebarContentState } from "../../../utils/constants";
import "./sidebar.css";

export const CloseButton = () => {
  const { setSidebarContent } = useSidebarState();

  const onClose = () => setSidebarContent(SidebarContentState.None);

  return (
    <button type="button" className="close-aside" onClick={onClose}>
      <CloseIcon />
    </button>
  );
};
