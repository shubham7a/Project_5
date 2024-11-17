import React from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { useState } from "react";

const Chat = () => {
  const [currentChat, setCurrentChat] = useState(null);
  return (
    <div className="flex h-screen">
      <Sidebar setCurrentChat={setCurrentChat} />
      <ChatWindow currentChat={currentChat} />
    </div>
  );
};

export default Chat;
