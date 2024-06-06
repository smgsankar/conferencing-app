import { atom } from "recoil";
import { SidebarContentState } from "../utils/constants";

export type Message = {
  time: string;
  sender: string;
  content: string;
};

export type MeetRoomState = {
  currentUser: string;
  users: string[];
  isPresenting: boolean;
  sidebarContent: SidebarContentState;
  messages: Message[];
};

export const INITIAL_MEET_ROOM_STATE: MeetRoomState = {
  currentUser: "",
  users: [],
  isPresenting: false,
  sidebarContent: SidebarContentState.None,
  messages: [],
};

export const meetRoomStateAtom = atom<MeetRoomState>({
  key: "meetRoomStateAtom",
  default: INITIAL_MEET_ROOM_STATE,
});
