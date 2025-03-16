import React, { useState, useEffect } from "react";
import Markdown from "./markdown";
import { ChatBubbleLeftIcon, UserIcon } from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { Message } from "ai/react";
import CopyButton from "./CopyButton";
import { format } from "date-fns";

type Props = {
  messages: Message[];
  isLoading: boolean;
  onInteraction: () => void;
};

const Messages = ({ messages = [], isLoading, onInteraction }: Props) => {
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [animateBot, setAnimateBot] = useState(false);
  const [animateUser, setAnimateUser] = useState(false);

  useEffect(() => {
    if (messages.length > 0) {
      setShowWelcomeMessage(false);
    }
  }, [messages]);

  // Trigger bot animation for 20 seconds
  useEffect(() => {
    if (messages.some((m) => m.role === "assistant")) {
      setAnimateBot(true);
      const botTimer = setTimeout(() => setAnimateBot(false), 20000);
      return () => clearTimeout(botTimer);
    }
  }, [messages]);

  // Trigger user animation for 10 seconds
  useEffect(() => {
    if (messages.some((m) => m.role === "user")) {
      setAnimateUser(true);
      const userTimer = setTimeout(() => setAnimateUser(false), 10000);
      return () => clearTimeout(userTimer);
    }
  }, [messages]);

  return (
    <div
      id="chatbox"
      className="flex flex-col-reverse w-full mb-5 gap-5 font-system-ui-ui-sans-serif"
      style={{ color: "white" }}
    >
      {showWelcomeMessage && !isLoading && (
        <div className="p-6 shadow-md rounded-lg ml-10 bg-gradient-to-r from-gray-800 to-blue-900 border border-blue-500/30 text-white dark:text-white relative animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <SparklesIcon className="h-5 w-5 text-blue-400 animate-pulse" />
            <h3 className="font-semibold text-lg text-blue-300">
              Genius AI Assistant
            </h3>
          </div>
          <Markdown text="Welcome to Genius AI Bot! 🌟 Got questions or need insights? Just ask! Our smart AI is here to deliver quick and precise answers. Dive in and enjoy the conversation!" />
        </div>
      )}
      {messages.map((m, index) => (
        <div key={index} className="flex items-start gap-4">
          {m.role === "assistant" ? (
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30">
              <SparklesIcon
                className={`text-blue-500 h-6 w-6 ${
                  animateBot ? "animate-bounce" : ""
                }`}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-600/20 border border-cyan-500/30">
              <UserIcon
                className={`text-cyan-500 h-6 w-6 ${
                  animateUser ? "animate-pulse" : ""
                }`}
              />
            </div>
          )}
          <div
            className={`flex flex-col gap-2 p-4 rounded-lg shadow-md w-full ${m.role === "assistant" ? "bg-gray-800/80 border border-blue-500/20" : "bg-gray-700/60 border border-cyan-500/20"}`}
          >
            <div className="flex justify-between items-start">
              <span className="text-xs text-gray-400">
                {format(m.createdAt || new Date(), "MMM d, h:mm a")}
              </span>
              {m.role === "assistant" && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
                  AI
                </span>
              )}
              {m.role === "user" && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400">
                  You
                </span>
              )}
            </div>
            <Markdown text={m.content} />
            <div className="flex justify-end mt-2">
              <CopyButton text={m.content} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
