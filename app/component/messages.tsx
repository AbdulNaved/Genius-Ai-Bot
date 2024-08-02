import React, { useState, useEffect } from "react";
import Markdown from "./markdown";
import { Bot, User2 } from "lucide-react";
import { Message } from "ai/react";
import CopyButton from "./CopyButton"; // Import CopyButton component

type Props = {
  messages: Message[],
  isLoading: boolean,
  onInteraction: () => void
};

const Messages = ({ messages, isLoading, onInteraction }: Props) => {
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);

  useEffect(() => {
    // Hide the welcome message after the first user interaction
    if (messages.length > 0) {
      setShowWelcomeMessage(false);
    }
  }, [messages]);

  return (
    <div
      id="chatbox"
      className="flex flex-col-reverse w-full  mt-2 gap-4 text-black"
    >
      {showWelcomeMessage && !isLoading && (
        <div className="p-6 shadow-md rounded-md ml-10 bg-gradient-to-r from-[#007BFF] to-[#00CFFF] text-white relative animate-fade-in">
          <Markdown text="Welcome to Genius AI Bot! 🌟 Got questions or need insights? Just ask! Our smart AI is here to deliver quick and precise answers. Dive in and enjoy the conversation!" />
        </div>
      )}
      {messages.map((m, index) => (
        <div
          key={index}
          className={`p-4 shadow-md rounded-md ml-10 relative ${
            m.role === "user" ? 'bg-stone-300' : 'bg-blue-100'
          }`}
        >
          <Markdown text={m.content} />
          {m.role === "user" ? (
            <User2 className="absolute -left-10 top-2 border rounded-full p-1 shadow-lg bg-white hover:bg-yellow-200" />
          ) : (
            <div className="">
              <Bot
                className={`absolute top-2 -left-10 border rounded-full p-1 shadow-lg bg-gray-400 ${
                  isLoading && index === messages.length - 1
                    ? "animate-bounce"
                    : ""
                }`}
              />
              <CopyButton text={m.content} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Messages;
