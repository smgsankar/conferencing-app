import { atom } from "recoil";
import { SidebarContentState } from "../utils/constants";
import { MeetRoomState, SidebarState, User } from "./state.types";

export const INITIAL_MEET_ROOM_STATE: MeetRoomState = {
  userStream: null,
  videoEnabled: false,
  audioEnabled: false,
  displayStream: null,
  displayAudioEnabled: false,
};

export const meetRoomStateAtom = atom<MeetRoomState>({
  key: "meetRoomStateAtom",
  default: INITIAL_MEET_ROOM_STATE,
});

export const INITIAL_SIDEBAR_STATE: SidebarState = {
  users: [],
  messages: [],
  sidebarContent: SidebarContentState.None,
};

export const sidebarStateAtom = atom<SidebarState>({
  key: "sidebarStateAtom",
  default: {
    users: [],
    messages: [],
    sidebarContent: SidebarContentState.None,
  },
});

export const currentUserAtom = atom<User | null>({
  key: "currentUserAtom",
  default: null,
});
