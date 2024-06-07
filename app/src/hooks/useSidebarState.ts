import { useRecoilState } from "recoil";
import { sidebarStateAtom } from "../store/atoms";
import { SidebarContentState } from "../utils/constants";
import { Message, User } from "../store/state.types";

export const useSidebarState = () => {
  const [sidebarState, setSidebarState] = useRecoilState(sidebarStateAtom);

  const setSidebarContent = (sidebarContent: SidebarContentState) => {
    setSidebarState((prevState) => ({
      ...prevState,
      sidebarContent,
    }));
  };

  const setUsers = (users: User[]) => {
    setSidebarState((prevState) => ({
      ...prevState,
      users,
    }));
  };

  const addUser = (user: User) => {
    setSidebarState((prevState) => ({
      ...prevState,
      users: [...prevState.users, user],
    }));
  };

  const removeUser = (userId: string) => {
    setSidebarState((prevState) => ({
      ...prevState,
      users: prevState.users.filter((u) => u.socketId !== userId),
    }));
  };

  const addMessage = (message: Message) => {
    setSidebarState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };

  return {
    ...sidebarState,
    setSidebarContent,
    addUser,
    setUsers,
    removeUser,
    addMessage,
  };
};
