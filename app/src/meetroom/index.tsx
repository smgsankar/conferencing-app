import { useEffect } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { UserTiles } from "./components/UserTiles";
import { useMeetRoomState } from "../store/hooks";
import { socket } from "../utils/socket";
import { Message } from "../store/atoms";
import { playNotification } from "../utils/helpers";

export const MeetRoom = () => {
  const {
    currentUser,
    setCurrentUser,
    setUsers,
    addUser,
    removeUser,
    addMessage,
  } = useMeetRoomState();

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      setCurrentUser(socket.id ?? "");
    });
    return () => {
      socket.off("connect");
    };
  }, [setCurrentUser]);

  useEffect(() => {
    socket.on("user-connected", (user: string) => {
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
    socket.on("user-disconnected", (user: string) => {
      removeUser(user);
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
    socket.on("message-received", (messageObject: Omit<Message, "sender">) => {
      addMessage({ ...messageObject, sender: currentUser });
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
