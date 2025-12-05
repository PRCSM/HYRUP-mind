import React, { useState } from 'react'
import Chat_User from '../components/chat/Chat_User'
import Chat_Area from '../components/chat/Chat_Area'
import { useChat } from "../contexts/ChatContext";

function Chat() {
        // Demo chat data - shared with Chat_User
    // const chats = [
    //     {
    //         id: 1,
    //         name: "Amazon",
    //         lastMessage: "Hey, What's up",
    //         img: "https://logo.clearbit.com/amazon.com",
    //     },
    //     {
    //         id: 2,
    //         name: "Google",
    //         lastMessage: "Today, Meeting is Over 👍",
    //         img: "https://logo.clearbit.com/google.com",
    //         unreadCount: 15,
    //     },
    //     {
    //         id: 3,
    //         name: "Tesla",
    //         lastMessage: "where are you buddy's 😎",
    //         img: "https://logo.clearbit.com/tesla.com",
    //     },
    // ];
    const { chats, selectedChatId, selectChat } = useChat();

    const selectedChat = chats.find(chat => chat.id === selectedChatId);
    return (
        <div className='w-full h-full flex gap-10 items-center justify-center pt-14 '>
            {/* <Chat_User 
                selectedChatId={selectedChatId} 
                setSelectedChatId={setSelectedChatId}
            />
            <Chat_Area 
                selectedChat={selectedChat} 
                setSelectedChatId={setSelectedChatId}
                        
            /> */
            }
            <Chat_User 
        selectedChatId={selectedChatId}
        selectChat={selectChat}   
      />
      
      <Chat_Area 
        selectedChat={selectedChat} 
        selectChat={selectChat}   
      />
        </div>
    )
}

export default Chat
