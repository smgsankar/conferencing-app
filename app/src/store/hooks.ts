import { useRecoilState } from "recoil";
import { Message, meetRoomStateAtom } from "./atoms";
import { SidebarContentState } from "../utils/constants";

export const useMeetRoomState = () => {
  const [meetRoomState, setMeetRoomState] = useRecoilState(meetRoomStateAtom);

  const setSidebarContent = (sidebarContent: SidebarContentState) => {
    setMeetRoomState((prevState) => ({
      ...prevState,
      sidebarContent,
    }));
  };

  const setUsers = (users: string[]) => {
    setMeetRoomState((prevState) => ({
      ...prevState,
      users,
    }));
  };

  const addUser = (user: string) => {
    setMeetRoomState((prevState) => ({
      ...prevState,
      users: [...prevState.users, user],
    }));
  };

  const removeUser = (user: string) => {
    setMeetRoomState((prevState) => ({
      ...prevState,
      users: prevState.users.filter((u) => u !== user),
    }));
  };

  const addMessage = (message: Message) => {
    setMeetRoomState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };

  const setCurrentUser = (user: string) => {
    setMeetRoomState((prevState) => ({
      ...prevState,
      currentUser: user,
    }));
  };

  return {
    ...meetRoomState,
    setSidebarContent,
    addUser,
    setUsers,
    removeUser,
    addMessage,
    setCurrentUser,
    setMeetRoomState,
  };
};
