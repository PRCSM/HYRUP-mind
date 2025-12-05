import React, { useState } from "react";
import { useChat } from "../../contexts/ChatContext";
import { getAuth } from "firebase/auth";


function Chat_User() {
  const auth = getAuth();
const currentUser = auth.currentUser;

  // Demo chat data
  // const [chats] = useState([
  //   {
  //     id: 1,
  //     name: "Amazon",
  //     lastMessage: "Hey, What's up",
  //     img: "https://logo.clearbit.com/amazon.com",
  //   },
  //   {
  //     id: 2,
  //     name: "Google",
  //     lastMessage: "Today, Meeting is Over 👍",
  //     img: "https://logo.clearbit.com/google.com",
  //     unreadCount: 15,
  //   },
  //   {
  //     id: 3,
  //     name: "Tesla",
  //     lastMessage: "where are you buddy's 😎",
  //     img: "https://logo.clearbit.com/tesla.com",
  //   },
  // ]);
  const [loading] = useState(false);
  // const currentUser = true; // Set to true for demo
const { chats, selectChat, deleteChat, selectedChatId } = useChat();


  const handleDeleteChat = async (e, chatId, chatName) => {
    e.stopPropagation();
    if (window.confirm(`Delete chat with ${chatName}?`)) {
      // Delete logic will be implemented with ChatContext
      console.log("Delete chat:", chatId);
    }
  };

  if (!currentUser) {
    return (
      <div className="bg-[#FFFAE9] rounded-[10px] border-2 sm:border-4 border-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] w-[40%] h-[87%] p-4">
        <h1 className="text-xl text-left md:text-2xl font-[Jost-Bold] mb-3 text-black">
          Users
        </h1>
        <div className="w-[95%] text-sm text-center text-neutral-600 font-[Jost-Regular]">
          Please sign in to view chats
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFAE9] rounded-[10px] border-2 sm:border-4 border-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] w-[95%] md:w-[40%] h-[85%] md:h-[87%] p-4">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-xl text-left md:text-2xl font-[Jost-Bold] text-black">
          Users
        </h1>
      </div>

      {loading && (
        <div className="w-[95%] text-sm text-center text-neutral-600 mb-4 font-[Jost-Regular]">
          Loading chats...
        </div>
      )}

      <div className="flex flex-col gap-4 items-center">
        {chats.length === 0 && !loading && (
          <div className="w-[95%] text-sm text-center text-neutral-600 font-[Jost-Regular]">
            No chats yet. Open a profile and press Chat to start.
          </div>
        )}

        {chats.map((c) => (
          <div
            key={c.id}
            onClick={() => selectChat(c.id)}
            className={`relative w-[95%] h-[80px] rounded-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.7)] flex justify-start items-center gap-4 p-4 cursor-pointer transition-all duration-200 ${
              selectedChatId === c.id ? "bg-[#E8F5E9]" : "bg-[#FFFFF3] hover:bg-[#FFEDD5]"
            }`}
          >
            <img
              className="h-12 w-12 rounded-full object-cover border border-black"
              src={c.img}
              alt={`${c.name} profile`}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/100x100?text=Avatar";
              }}
            />
            <div className="flex flex-col justify-center items-start overflow-hidden flex-1">
              <h2 className="text-lg font-[Jost-Bold] text-black truncate w-full">
                {c.name}
              </h2>
              <p className="text-sm font-[Jost-Regular] text-[#00000091] truncate w-full">
                {c.lastMessage}
              </p>
            </div>
            {/* Unread count badge */}
            {c.unreadCount && (
              <div className="absolute top-2 right-12 w-7 h-7 flex items-center justify-center bg-gray-400 text-white rounded-full border border-black text-xs font-[Jost-Bold]">
                {c.unreadCount}
              </div>
            )}
            {/* Delete button */}
            <button
              onClick={(e) => handleDeleteChat(e, c.id, c.name)}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.7)] transition-all hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.7)] hover:translate-x-[-1px] hover:translate-y-[-1px]"
              title="Delete chat"
            >
              <span className="text-xs font-bold">✕</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chat_User;
