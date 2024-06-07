import { SidebarContentState } from "../utils/constants";

export type Message = {
  time: string;
  sender: string;
  content: string;
};

export type User = {
  socketId: string;
  name: string;
};

export type SidebarState = {
  users: User[];
  messages: Message[];
  sidebarContent: SidebarContentState;
};

export type MeetRoomState = {
  videoEnabled: boolean;
  audioEnabled: boolean;
  userStream: MediaStream | null;
  displayStream: MediaStream | null;
  displayAudioEnabled: boolean;
};
