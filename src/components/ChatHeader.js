import React from "react";

const ChatHeader = ({ currentChat }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-200 border-b border-gray-300">
      <div className="text-lg font-medium">{currentChat}</div>
      <div className="flex space-x-4">
        <button className="text-gray-500">🔍</button>
        <button className="text-gray-500">📞</button>
        <button className="text-gray-500">⋮</button>
      </div> 
    </div>
  );
};

export default ChatHeader;
