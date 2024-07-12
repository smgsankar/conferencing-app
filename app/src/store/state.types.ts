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

export type Stream = MediaStream | null;

export type MeetRoomState = {
  videoEnabled: boolean;
  audioEnabled: boolean;
  userStream: Stream;
  displayStream: Stream;
  displayAudioEnabled: boolean;
  remoteStreams: Stream[];
};
