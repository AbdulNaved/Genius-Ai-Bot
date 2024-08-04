"use client";

import { useChat } from "ai/react";
import { useState } from "react";
import Messages from "./component/messages";
import InputForm from "./component/inputForm"; 
// update 
export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    api: "api/genai",
  });

  const [interaction, setInteraction] = useState(false);

  const handleInteraction = () => {
    setInteraction(true);
  };

  return (
    <main className="flex flex-col min-h-screen p-8 bg-[#111827]">
      <div className="flex-grow overflow-auto">
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
      />
    </main>
  );
}
