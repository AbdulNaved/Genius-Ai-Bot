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
import { useAuth } from "./context/authcontext";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const [isAsideOpen, setAsideOpen] = useState(false);

  // Check authentication and redirect if not authenticated
  useEffect(() => {
    if (isClient && !authLoading && !isAuthenticated) {
      router.push("/signup");
    }
  }, [isAuthenticated, authLoading, isClient, router]);

  // Initialize `history` from localStorage only if on the client
  const [history, setHistory] = useState<any[]>(() => {
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
      const newItem = {
        text: input,
        timestamp: new Date().toISOString(),
      };
      const updatedHistory = [...prevHistory, newItem];
      localStorageService.saveHistory(updatedHistory);
      return updatedHistory;
    });
  };

  // Show loading state while checking authentication or if not client-side
  if (authLoading || !isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-customDark dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If not authenticated, don't render the page (redirect will happen)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-customDark dark:bg-gray-900 text-white dark:text-white">
      <NavBar setAsideOpen={setAsideOpen} />
      <Aside isOpen={isAsideOpen} history={history} setHistory={setHistory} />
      <main
        className={`flex flex-col min-h-screen pt-16 pb-24 transition-all duration-300 ${isAsideOpen ? "ml-72" : "ml-0"}`}
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
