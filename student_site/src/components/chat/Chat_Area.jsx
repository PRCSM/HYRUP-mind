import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Chat_Area({ selectedChat, setSelectedChatId }) {
  const [messageInput, setMessageInput] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const listRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Manage the qualifications or preference used to hide jobs from your search",
      sender: "company",
      timestamp: new Date(),
    },
    {
      id: 2,
      text: "Manage the qualifications or preference used to hide jobs from your search",
      sender: "user",
      timestamp: new Date(),
    },
    {
      id: 3,
      text: "Manage the qualifications or preference used to hide jobs from your search",
      sender: "company",
      timestamp: new Date(),
    },
    {
      id: 4,
      text: "Manage the qualifications or preference used to hide jobs from your searchManage the qualifications or preference used to hide jobs from your searchManage the qualifications or preference used to hide jobs from your searchManage the qualifications or preference used to hide jobs from your search",
      sender: "user",
      timestamp: new Date(),
    },
  ]);

  useEffect(() => {
    if (listRef.current)
      listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, selectedChat]);

  // Encodes an attachment into a simple tag inside message text
  const makeFileTag = (a) =>
    `[file|${encodeURIComponent(a.name)}|${encodeURIComponent(a.type)}|${
      a.size
    }|${encodeURIComponent(a.url)}|${a.isImage ? 1 : 0}]`;

  const parseFileTag = (text) => {
    const re = /\[file\|([^|]+)\|([^|]+)\|(\d+)\|([^\]|]+)\|(0|1)\]/;
    const m = text?.match(re);
    if (!m) return { cleanText: text, file: null };
    const file = {
      name: decodeURIComponent(m[1]),
      type: decodeURIComponent(m[2]),
      size: Number(m[3]),
      url: decodeURIComponent(m[4]),
      isImage: m[5] === "1",
    };
    const cleanText = text.replace(re, "").trim();
    return { cleanText, file };
  };

  const openPicker = () => fileInputRef.current?.click();

  const onPickFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    // Simulate upload delay
    setTimeout(() => {
      const url = URL.createObjectURL(file);
      setAttachment({
        file,
        url,
        name: file.name,
        type: file.type || "application/octet-stream",
        size: file.size,
        isImage: (file.type || "").startsWith("image/"),
      });
      setIsUploading(false);
      setShowPreview(true);
      e.target.value = "";
    }, 1500);
  };

  // Attachment Card Component
  const AttachmentCard = ({ file }) => (
    <div
      className={`relative overflow-hidden rounded-[10px] border-2 border-black bg-black/5 ${
        file.isImage
          ? "w-[200px] h-[280px] sm:w-[300px] sm:h-[320px]"
          : "w-[200px]"
      } group cursor-pointer`}
      onClick={() => {
        setAttachment(file);
        setShowPreview(true);
      }}
      title={file.name}
    >
      {file.isImage ? (
        <img
          src={file.url}
          alt={file.name}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      ) : (
        <div className="flex items-center gap-3 p-4 bg-white">
          <div className="grid h-12 w-12 place-items-center rounded-md border border-gray-300 bg-white">
            📎
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-[Jost-Medium] text-black">
              {file.name}
            </div>
            <a
              href={file.url}
              download={file.name}
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-blue-600 hover:underline font-[Jost-Regular]"
            >
              Download
            </a>
          </div>
        </div>
      )}
      <a
        href={file.url}
        download={file.name}
        onClick={(e) => e.stopPropagation()}
        className="absolute top-2 right-2 hidden group-hover:grid h-9 w-9 place-items-center rounded-full border-2 border-white/70 bg-black/50 text-white"
        title="Download"
      >
        ⬇
      </a>
    </div>
  );

  const clearAttachment = () => {
    setAttachment(null);
    setShowPreview(false);
  };

  const handleSendMessage = () => {
    const text = messageInput.trim();
    if (!selectedChat) return;
    if (!text && !attachment) return;

    let messageText = text;
    if (attachment) {
      messageText = text + (text ? " " : "") + makeFileTag(attachment);
    }

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        text: messageText,
        sender: "user",
        timestamp: new Date(),
      },
    ]);

    setMessageInput("");
    clearAttachment();
    setShowPreview(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") {
        setShowPreview(false);
        setShowEmojiPicker(false);
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target)
      ) {
        setShowEmojiPicker(false);
      }
    };
    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showEmojiPicker]);

  // Common emojis
  const emojis = [
    "😊",
    "😂",
    "❤️",
    "👍",
    "👎",
    "🙏",
    "💪",
    "🎉",
    "🔥",
    "✨",
    "😍",
    "🤔",
    "😎",
    "🤩",
    "😢",
    "😭",
    "😡",
    "🥺",
    "😴",
    "🤗",
    "👋",
    "👏",
    "💼",
    "📊",
    "📈",
    "💡",
    "⭐",
    "✅",
    "❌",
    "⚡",
  ];

  const addEmoji = (emoji) => {
    setMessageInput(messageInput + emoji);
    setShowEmojiPicker(false);
  };

  // Empty state - no chat selected
  if (!selectedChat) {
    return (
      <div className="hidden md:flex w-[95%] md:w-[50%] h-[85%] md:h-[87%] bg-[#FFFAE9] rounded-[10px] border-2 sm:border-4 border-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] flex-col items-center justify-center p-8">
        <div className="text-6xl font-[Jost-Bold] text-black mb-4">Zzz...</div>
        <img
          src="/images/sleeping-sloth.png"
          alt="Sleeping sloth"
          className="w-64 h-64 object-contain mb-6"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <h1 className="text-5xl font-[Jost-Bold] text-black mb-4">HYRUP</h1>
        <p className="text-2xl font-[Jost-Bold] text-gray-400 tracking-wider">
          SWIPE MATCH GROW
        </p>
      </div>
    );
  }

  // Active chat state
  return (
    <>
      {/* Backdrop blur for mobile */}
      <div
        className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-[fadeIn_0.3s_ease-out]"
        onClick={() => setSelectedChatId(null)}
      />

      {/* Chat Area */}
      <motion.div
        initial={
          isMobile
            ? { opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }
            : { opacity: 1, scale: 1, x: 0, y: 0 }
        }
        animate={
          isMobile
            ? { opacity: 1, scale: 1, x: "-50%", y: "-50%" }
            : { opacity: 1, scale: 1, x: 0, y: 0 }
        }
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed md:static top-1/2 left-1/2 md:translate-x-0 md:translate-y-0 z-50 md:z-auto w-[95%] md:w-[50%] h-[95%] md:h-[87%] bg-[#FFFAE9] rounded-[10px] border-2 sm:border-4 border-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] flex flex-col"
      >
        {/* Chat Header */}
        <div className="flex items-center gap-4 p-4 border-b-2 border-gray-900 bg-white rounded-t-[8px]">
          {/* Back button - mobile only */}
          <button
            type="button"
            onClick={() => setSelectedChatId(null)}
            className="md:hidden grid h-10 w-10 place-items-center rounded-full border-2 border-black bg-white hover:bg-gray-100 transition-colors"
            aria-label="Back to chat list"
            title="Back"
          >
            ←
          </button>
          <img
            className="h-12 w-12 rounded-full object-cover border-2 border-black"
            src={selectedChat.img}
            alt={selectedChat.name}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/100x100?text=Avatar";
            }}
          />
          <div className="flex flex-col">
            <h2 className="text-xl font-[Jost-Bold] text-black">
              {selectedChat.name}
            </h2>
            <p className="text-sm font-[Jost-Regular] text-gray-600">Online</p>
          </div>
        </div>

        {/* Messages Area */}
        <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Date divider */}
          <div className="flex justify-center">
            <span className="bg-gray-400 text-white text-xs font-[Jost-Medium] px-3 py-1 rounded-full">
              Today
            </span>
          </div>

          {messages.length === 0 && (
            <div className="flex justify-center mt-4">
              <span className="bg-gray-400 text-white text-xs font-[Jost-Medium] px-3 py-1 rounded-full">
                Say hello to start the conversation
              </span>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg) => {
            const { cleanText, file } = parseFileTag(msg.text);
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "company" && (
                  <div className="w-10 h-10 rounded-full bg-cyan-300 border-2 border-black shrink-0 flex items-center justify-center">
                    <span className="text-xl">🤖</span>
                  </div>
                )}

                <div className="flex max-w-[70%] flex-col items-start gap-2">
                  {cleanText && (
                    <div
                      className={`whitespace-pre-wrap break-words border-2 border-black p-3 text-sm font-[Jost-Regular] leading-relaxed text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.7)] ${
                        msg.sender === "user"
                          ? "rounded-[10px] rounded-br-md bg-purple-200"
                          : "rounded-[10px] rounded-bl-md bg-white"
                      }`}
                    >
                      {cleanText}
                    </div>
                  )}

                  {file && <AttachmentCard file={file} />}
                </div>

                {msg.sender === "user" && (
                  <div className="w-10 h-10 rounded-full bg-orange-300 border-2 border-black shrink-0 flex items-center justify-center">
                    <span className="text-xl">👤</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Composer */}
        <div className="p-4 border-t-2 border-gray-900 space-y-2">
          {/* Attachment chip */}
          {attachment && (
            <div
              className="flex items-center justify-between gap-3 rounded-[10px] border-2 border-black bg-white p-2 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,0.7)]"
              onClick={() => setShowPreview(true)}
              title="Tap to preview"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                {attachment.isImage ? (
                  <img
                    src={attachment.url}
                    alt={attachment.name}
                    className="h-12 w-12 rounded-md object-cover border border-gray-300"
                  />
                ) : (
                  <div className="grid h-12 w-12 place-items-center rounded-md border border-gray-300 bg-white">
                    📎
                  </div>
                )}
                <div className="min-w-0">
                  <div className="truncate text-sm font-[Jost-Medium] text-black">
                    {attachment.name}
                  </div>
                  <div className="text-xs font-[Jost-Regular] text-gray-500">
                    {(attachment.size / 1024).toFixed(1)} KB
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  clearAttachment();
                }}
                className="grid h-8 w-8 place-items-center rounded-full border-2 border-black bg-red-500 text-white hover:bg-red-600"
                title="Remove attachment"
              >
                ✕
              </button>
            </div>
          )}

          {/* Message Input */}
          <div className="flex items-center gap-2 bg-white rounded-[10px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.7)] p-2 relative">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a new message here"
              className="flex-1 outline-none font-[Jost-Regular] text-sm px-2 bg-transparent"
              disabled={!selectedChat}
            />
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={onPickFile}
            />
            <button
              type="button"
              onClick={openPicker}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
              disabled={!selectedChat}
              title="Attach file"
            >
              <span className="text-xl">📎</span>
            </button>
            <div className="relative" ref={emojiPickerRef}>
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
                title="Add emoji"
              >
                <span className="text-xl">😊</span>
              </button>

              {/* Emoji Picker Dropdown */}
              {showEmojiPicker && (
                <div className="absolute bottom-full right-0 mb-2 w-[280px] bg-white rounded-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.7)] p-3 z-50">
                  <div className="grid grid-cols-8 gap-2">
                    {emojis.map((emoji, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => addEmoji(emoji)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors text-xl"
                        title={emoji}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!selectedChat || (!messageInput.trim() && !attachment)}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Send"
            >
              <span className="text-xl">➤</span>
            </button>
          </div>
        </div>

        {/* WhatsApp-like full-screen preview modal */}
        {attachment && showPreview && (
          <div
            className="fixed inset-0 z-[70] bg-black/80 flex items-center justify-center p-4"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setShowPreview(false);
            }}
          >
            <div className="relative w-full max-w-[900px] h-[85vh] rounded-[10px] border-2 border-black bg-[#0b0b0b] overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)]">
              {/* Top bar */}
              <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-2 py-2 bg-black/40">
                <button
                  type="button"
                  className="grid h-10 w-10 place-items-center rounded-full border-2 border-white/30 bg-white/10 text-white hover:bg-white/20"
                  onClick={() => setShowPreview(false)}
                  aria-label="Back"
                  title="Back"
                >
                  ←
                </button>
                <div className="text-white/80 text-sm font-[Jost-Medium] truncate px-2">
                  {attachment.name}
                </div>
                <button
                  type="button"
                  className="grid h-10 w-10 place-items-center rounded-full border-2 border-white/30 bg-white/10 text-white hover:bg-white/20"
                  onClick={clearAttachment}
                  aria-label="Remove"
                  title="Remove"
                >
                  ✕
                </button>
              </div>

              {/* Preview area */}
              <div className="absolute inset-x-0 top-12 bottom-16 grid place-items-center">
                {attachment.isImage ? (
                  <img
                    src={attachment.url}
                    alt={attachment.name}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="text-white/90 text-center">
                    <div className="text-5xl mb-4">📎</div>
                    <div className="text-sm font-[Jost-Medium]">
                      {attachment.name}
                    </div>
                    <div className="text-xs font-[Jost-Regular] text-white/60">
                      {(attachment.size / 1024).toFixed(1)} KB
                    </div>
                  </div>
                )}
              </div>

              {/* Caption + actions (bottom bar) */}
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-black/40 p-3">
                <input
                  className="h-11 flex-1 rounded-full border-2 border-white/30 bg-white/10 px-4 text-sm font-[Jost-Regular] text-white placeholder:text-white/60 outline-none"
                  placeholder="Add a caption"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <button
                  className="grid h-11 w-11 place-items-center rounded-full border-2 border-white/30 bg-emerald-500 text-white hover:bg-emerald-600 disabled:bg-white/20 disabled:border-white/20"
                  onClick={handleSendMessage}
                  disabled={
                    !selectedChat || (!messageInput.trim() && !attachment)
                  }
                  title="Send"
                >
                  ➤
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Loading Overlay */}
        <AnimatePresence>
          {isUploading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[60] flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-[10px]"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white p-6 rounded-[10px] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center gap-4"
              >
                <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
                <p className="font-[Jost-Bold] text-lg">Uploading...</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export default Chat_Area;
