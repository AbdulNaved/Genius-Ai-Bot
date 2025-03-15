"use client";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Messages from "./component/messages";
import InputForm from "./component/inputForm";
import NavBar from "./component/NavBar";
import Aside from "./component/Aside";
import localStorageService from "./Service/localStorage";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isAsideOpen, setAsideOpen] = useState(false);

  // Initialize `history` from localStorage only if on the client
  const [history, setHistory] = useState<string[]>(() => {
    if (localStorageService.isBrowser()) {
      return localStorageService.getHistory();
    }
    return [];
  });

  // Initialize `messages` from localStorage only if on the client
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "/api/genai",
      initialMessages: localStorageService.isBrowser()
        ? localStorageService.getMessages()
        : [],
      onError: (error) => {
        console.error("Chat error:", error);
        toast.error("An error occurred while processing your request");
      },
    });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Save history to localStorage when `history` changes, only if client-side
  useEffect(() => {
    if (isClient) {
      localStorageService.saveHistory(history);
    }
  }, [history, isClient]);

  // Save messages to localStorage when `messages` change, only if client-side
  useEffect(() => {
    if (isClient) {
      localStorageService.saveMessages(messages);
    }
  }, [messages, isClient]);

  const [interaction, setInteraction] = useState(false);

  const handleInteraction = () => {
    setInteraction(true);
  };

  const addToHistory = (input: string) => {
    if (!input.trim()) return;

    setHistory((prevHistory) => {
      const updatedHistory = [...prevHistory, input];
      localStorageService.saveHistory(updatedHistory);
      return updatedHistory;
    });
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-customDark text-white">
      <NavBar setAsideOpen={setAsideOpen} />
      <Aside isOpen={isAsideOpen} history={history} />
      <main
        className={`flex flex-col min-h-screen pt-16 pb-24 transition-all duration-300 ${isAsideOpen ? "ml-64" : "ml-0"}`}
      >
        <div className="flex-grow overflow-auto px-4 md:px-8 py-6">
          <Messages
            messages={messages}
            isLoading={isLoading}
            onInteraction={handleInteraction}
          />
        </div>
        <InputForm
          input={input}
          handleInputChange={(e) => {
            handleInputChange(e);
            handleInteraction();
          }}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          stop={stop}
          addToHistory={addToHistory}
          isAsideOpen={isAsideOpen}
        />
      </main>
    </div>
  );
}
