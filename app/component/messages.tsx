// src/component/Messages.tsx

// import React, { useState, useEffect } from "react";
// import Markdown from "./markdown";
// import { Bot, User2 } from "lucide-react";
// import { Message } from "ai/react";
// import CopyButton from "./CopyButton";

// type Props = {
//   messages: Message[];
//   isLoading: boolean;
//   onInteraction: () => void;
// };

// const Messages = ({ messages = [], isLoading, onInteraction }: Props) => {  // Default to empty array
//   const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);

//   useEffect(() => {
//     if (messages.length > 0) {
//       setShowWelcomeMessage(false);
//     }
//   }, [messages]);

//   return (
//     <div
//       id="chatbox"
//       className="flex flex-col-reverse w-full mb-5 gap-5"
//       style={{ color: "white" }}
//     >
//       {showWelcomeMessage && !isLoading && (
//         <div className="p-6 shadow-md rounded-md ml-10 bg-gradient-to-r from-gray-700 to-gray-800 text-white relative animate-fade-in">
//           <Markdown text="Welcome to Genius AI Bot! 🌟 Got questions or need insights? Just ask! Our smart AI is here to deliver quick and precise answers. Dive in and enjoy the conversation!" />
//         </div>
//       )}
//       {messages.map((m, index) => (
//         <div key={index} className="flex items-start gap-4">
//           {m.role === "assistant" ? (
//             <Bot className="text-[#007BFF] h-6 w-6 animate-bounce" />
//           ) : (
//             <User2 className="text-[#00CFFF] h-6 w-6 animate-pulse" />
//           )}
//           <div
//             className="flex flex-col gap-2 p-4 rounded-md shadow-sm w-full"
//             style={{ backgroundColor: "rgb(33, 33, 33)" }}
//           >
//             <Markdown text={m.content} />
//             <CopyButton text={m.content} />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Messages;

import React, { useState, useEffect } from "react";
import Markdown from "./markdown";
import { Bot, User2 } from "lucide-react";
import { Message } from "ai/react";
import CopyButton from "./CopyButton";

type Props = {
  messages: Message[];
  isLoading: boolean;
  onInteraction: () => void;
};

const Messages = ({ messages = [], isLoading, onInteraction }: Props) => {
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [animateBot, setAnimateBot] = useState(false); // Bot animation state
  const [animateUser, setAnimateUser] = useState(false); // User animation state

  useEffect(() => {
    if (messages.length > 0) {
      setShowWelcomeMessage(false);
    }
  }, [messages]);

  // Trigger bot animation for 20 seconds
  useEffect(() => {
    if (messages.some((m) => m.role === "assistant")) {
      setAnimateBot(true);
      const botTimer = setTimeout(() => setAnimateBot(false), 20000); // 20 seconds
      return () => clearTimeout(botTimer);
    }
  }, [messages]);

  // Trigger user animation for 10 seconds
  useEffect(() => {
    if (messages.some((m) => m.role === "user")) {
      setAnimateUser(true);
      const userTimer = setTimeout(() => setAnimateUser(false), 10000); // 10 seconds
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
        <div className="p-6 shadow-md rounded-md ml-10 bg-gradient-to-r from-gray-700 to-gray-800 text-white relative animate-fade-in">
          <Markdown text="Welcome to Genius AI Bot! 🌟 Got questions or need insights? Just ask! Our smart AI is here to deliver quick and precise answers. Dive in and enjoy the conversation!" />
        </div>
      )}
      {messages.map((m, index) => (
        <div key={index} className="flex items-start gap-4">
          {m.role === "assistant" ? (
            <Bot
              className={`text-[#007BFF] h-6 w-6 ${
                animateBot ? "animate-bounce" : ""
              }`} // Apply animation conditionally
            />
          ) : (
            <User2
              className="text-[#00CFFF] h-6 w-6 "
                // Apply animation conditionally
            />
          )}
          <div
            className="flex flex-col gap-2 p-4 rounded-md shadow-sm w-full"
            style={{ backgroundColor: "rgb(33, 33, 33)" }}
          >
            <Markdown text={m.content} />
            <CopyButton text={m.content} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;


// // coorect
// import React, { useState, useEffect } from "react";
// import Markdown from "./markdown";
// import { Bot, User2 } from "lucide-react";
// import { Message } from "ai/react";
// import CopyButton from "./CopyButton"; // Import CopyButton component

// type Props = {
//   messages: Message[];
//   isLoading: boolean;
//   onInteraction: () => void;
// };

// const Messages = ({ messages, isLoading, onInteraction }: Props) => {
//   const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);

//   useEffect(() => {
//     // Hide the welcome message after the first user interaction
//     if (messages.length > 0) {
//       setShowWelcomeMessage(false);
//     }
//   }, [messages]);

//   return (
//     <div
//       id="chatbox"
//       className="flex flex-col-reverse w-full mb-5 gap-5"
//       style={{ color: "white" }} // White text color for better contrast on dark background
//     >
//       {showWelcomeMessage && !isLoading && (
//         <div className="p-6 shadow-md rounded-md ml-10 bg-gradient-to-r from-gray-700 to-gray-800 text-white relative animate-fade-in">
//           <Markdown text="Welcome to Genius AI Bot! 🌟 Got questions or need insights? Just ask! Our smart AI is here to deliver quick and precise answers. Dive in and enjoy the conversation!" />
//         </div>
//       )}
//       {messages.map((m, index) => (
//         <div key={index} className="flex items-start gap-4">
//           {m.role === "assistant" ? (
//             <Bot className="text-[#007BFF] h-6 w-6 animate-bounce" />
//           ) : (
//             <User2 className="text-[#00CFFF]  h-6 w-6 animate-pulse" />
//           )}
//           <div
//             className="flex flex-col gap-2 p-4 rounded-md shadow-sm w-full"
//             style={{ backgroundColor: "rgb(33, 33, 33)" }} // Background for the message container
//           >
//             <Markdown text={m.content} />
//             <CopyButton text={m.content} />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Messages;


// import React, { useState, useEffect } from "react";
// import Markdown from "./markdown";
// import { Bot, User2 } from "lucide-react";
// import { Message } from "ai/react";
// import CopyButton from "./CopyButton"; // Import CopyButton component

// type Props = {
//   messages: Message[];
//   isLoading: boolean;
//   onInteraction: () => void;
// };

// const Messages = ({ messages, isLoading, onInteraction }: Props) => {
//   const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);

//   useEffect(() => {
//     // Hide the welcome message after the first user interaction
//     if (messages.length > 0) {
//       setShowWelcomeMessage(false);
//     }
//   }, [messages]);

//   return (
//     <div
//       id="chatbox"
//       className="flex flex-col-reverse w-full mt-2 gap-4"
//       style={{ color: "rgb(13, 13, 13)" }} // Apply text color globally
//     >
//       {showWelcomeMessage && !isLoading && (
//         <div className="p-6 shadow-md rounded-md ml-10 bg-gradient-to-r from-gray-800 to-gray-900 text-white relative animate-fade-in">
//           <Markdown text="Welcome to Genius AI Bot! 🌟 Got questions or need insights? Just ask! Our smart AI is here to deliver quick and precise answers. Dive in and enjoy the conversation!" />
//         </div>
//       )}
//       {messages.map((m, index) => (
//         <div key={index} className="flex items-start gap-4 text-white">
//           {m.role === "assistant" ? (
//             <Bot className="text-[#007BFF] h-6 w-6 animate-bounce" />
//           ) : (
//             <User2 className="text-[#00CFFF] h-6 w-6 animate-pulse" />
//           )}
//           <div
//             className="flex flex-col gap-2 p-4 rounded-md shadow-sm w-full"
//             style={{ backgroundColor: "rgb(13, 13, 13)" }} // Background for the message container
//           >
//             <Markdown text={m.content} />
//             <CopyButton text={m.content} />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Messages;


// import React, { useState, useEffect } from "react";
// import Markdown from "./markdown";
// import { Bot, User2 } from "lucide-react";
// import { Message } from "ai/react";
// import CopyButton from "./CopyButton"; // Import CopyButton component

// type Props = {
//   messages: Message[];
//   isLoading: boolean;
//   onInteraction: () => void;
// };

// const Messages = ({ messages, isLoading, onInteraction }: Props) => {
//   const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);

//   useEffect(() => {
//     // Hide the welcome message after the first user interaction
//     if (messages.length > 0) {
//       setShowWelcomeMessage(false);
//     }
//   }, [messages]);

//   return (
//     <div
//       id="chatbox"
//       className="flex flex-col-reverse w-full mt-2 gap-4 text-black"
//     >
//       {showWelcomeMessage && !isLoading && (
//         <div className="p-6 shadow-md rounded-md ml-10 bg-gradient-to-r from-[#007BFF] to-[#00CFFF] text-white relative animate-fade-in">
//           <Markdown text="Welcome to Genius AI Bot! 🌟 Got questions or need insights? Just ask! Our smart AI is here to deliver quick and precise answers. Dive in and enjoy the conversation!" />
//         </div>
//       )}
//       {messages.map((m, index) => (
//         <div key={index} className="flex items-start gap-4">
//           {m.role === "assistant" ? (
//             <Bot className="text-[#007BFF] h-6 w-6 animate-bounce " />
//           ) : (
//             <User2 className="text-[#00CFFF] h-6 w-6 	animate-pulse" />
//           )}
//           <div className="flex flex-col gap-2 text-[#212121] p-4 rounded-md shadow-sm w-full">
//             <Markdown text={m.content} />
//             <CopyButton text={m.content} /> {/* Add CopyButton */}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Messages;
