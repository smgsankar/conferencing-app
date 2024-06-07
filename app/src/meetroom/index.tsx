import { useEffect } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { UserTiles } from "./components/UserTiles";
import { socket } from "../utils/socket";
import { playNotification } from "../utils/helpers";
import { useSidebarState } from "../hooks/useSidebarState";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { Message, User } from "../store/state.types";

export const MeetRoom = () => {
  const { setUsers, addUser, removeUser, addMessage } = useSidebarState();
  const { currentUser, setCurrentUser } = useCurrentUser();

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      const socketId = socket.id ?? "";
      setCurrentUser({ name: socketId, socketId });
    });
    return () => {
      socket.off("connect");
    };
  }, [setCurrentUser]);

  useEffect(() => {
    socket.on("user-connected", (user: User) => {
      if (Array.isArray(user)) {
        setUsers(user);
      } else {
        addUser(user);
      }
    });

    return () => {
      socket.off("user-connected");
    };
  }, [setUsers, addUser]);

  useEffect(() => {
    socket.on("user-disconnected", (userId: string) => {
      removeUser(userId);
    });

    return () => {
      socket.off("user-disconnected");
    };
  }, [removeUser]);

  useEffect(() => {
    socket.on("message", (messageObject: Message) => {
      playNotification();
      addMessage(messageObject);
    });

    return () => {
      socket.off("message");
    };
  }, [addMessage]);

  useEffect(() => {
    if (!currentUser) return;
    socket.on("message-received", (messageObject: Omit<Message, "sender">) => {
      addMessage({ ...messageObject, sender: currentUser.socketId });
    });

    return () => {
      socket.off("message-received");
    };
  }, [addMessage, currentUser]);

  return (
    <>
      <Header />
      <main>
        <UserTiles />
        <Sidebar />
      </main>
      <Footer />
    </>
  );
};
