"use client";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Messages from "./component/messages";
import InputForm from "./component/inputForm";
import NavBar from "./component/NavBar";
import Aside from "./component/Aside";
import localStorageService from "./Service/localStorage";  // Import localStorage service

export default function Home() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);  // State to check if it's client-side
  const [isAsideOpen, setAsideOpen] = useState(false);

  // Initialize `history` from localStorage only if on the client
  const [history, setHistory] = useState<string[]>(() => {
    if (localStorageService.isBrowser()) {
      return localStorageService.getHistory();
    }
    return [];
  });

  // Initialize `messages` from localStorage only if on the client
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    api: "/api/genai",
    initialMessages: localStorageService.isBrowser() ? localStorageService.getMessages() : [],  // Fetch from localStorage only if in browser
  });

  useEffect(() => {
    setIsClient(true);  // Set client-side flag once rendered
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
    setHistory((prevHistory) => {
      const updatedHistory = [...prevHistory, input];
      localStorageService.saveHistory(updatedHistory);  // Save to localStorage
      return updatedHistory;
    });
  };

  const handleLoginSuccess = () => {
    router.push("/signup");
  };

  if (!isClient) {
    return null;  // Return null on server side to avoid rendering issues
  }

  return (
    <div className="relative min-h-screen bg-coolGray-900">
      <NavBar setAsideOpen={setAsideOpen} />
      <Aside isOpen={isAsideOpen} history={history} />
      <main
        className={`flex-grow p-8 bg-coolGray-900 text-white transition-all duration-300 ${
          isAsideOpen ? "ml-64" : "ml-0"
        }`}
      >
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
          addToHistory={addToHistory}
          isAsideOpen={isAsideOpen}  // Ensure to pass this prop
        />
      </main>
    </div>
  );
}


// "use client";

// import { useChat } from "ai/react";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Messages from "./component/messages";
// import InputForm from "./component/inputForm";
// import NavBar from "./component/NavBar";
// import Aside from "./component/Aside";
// import localStorageService from "./Service/localStorage";  // Import localStorage service

// export default function Home() {
//   const router = useRouter();
//   const [isClient, setIsClient] = useState(false);  // State to check if it's client-side
//   const [isAsideOpen, setAsideOpen] = useState(false);

//   // Initialize `history` from localStorage only if on the client
//   const [history, setHistory] = useState<string[]>(() => {
//     if (localStorageService.isBrowser()) {
//       return localStorageService.getHistory();
//     }
//     return [];
//   });

//   // Initialize `messages` from localStorage only if on the client
//   const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
//     api: "/api/genai",
//     initialMessages: localStorageService.isBrowser() ? localStorageService.getMessages() : [],  // Fetch from localStorage only if in browser
//   });

//   useEffect(() => {
//     setIsClient(true);  // Set client-side flag once rendered
//   }, []);

//   // Save history to localStorage when `history` changes, only if client-side
//   useEffect(() => {
//     if (isClient) {
//       localStorageService.saveHistory(history);
//     }
//   }, [history, isClient]);

//   // Save messages to localStorage when `messages` change, only if client-side
//   useEffect(() => {
//     if (isClient) {
//       localStorageService.saveMessages(messages);
//     }
//   }, [messages, isClient]);

//   const [interaction, setInteraction] = useState(false);

//   const handleInteraction = () => {
//     setInteraction(true);
//   };

//   const addToHistory = (input: string) => {
//     setHistory((prevHistory) => {
//       const updatedHistory = [...prevHistory, input];
//       localStorageService.saveHistory(updatedHistory);  // Save to localStorage
//       return updatedHistory;
//     });
//   };

//   const handleLoginSuccess = () => {
//     router.push("/signup");
//   };

//   if (!isClient) {
//     return null;  // Return null on server side to avoid rendering issues
//   }

//   return (
//     <div className="relative min-h-screen bg-coolGray-900">
//       <NavBar setAsideOpen={setAsideOpen} />
//       <Aside isOpen={isAsideOpen} history={history} />
//       <main
//         className={`flex-grow p-8 bg-coolGray-900 text-white transition-all duration-300 ${
//           isAsideOpen ? "ml-64" : "ml-0"
//         }`}
//       >
//         <div className="flex-grow overflow-auto">
//           <Messages
//             messages={messages}
//             isLoading={isLoading}
//             onInteraction={handleInteraction}
//           />
//         </div>
//         <InputForm
//           input={input}
//           handleInputChange={(e) => {
//             handleInputChange(e);
//             handleInteraction();
//           }}
//           handleSubmit={handleSubmit}
//           isLoading={isLoading}
//           stop={stop}
//           addToHistory={addToHistory}
//         />
//       </main>
//     </div>
//   );
// }



// "use client";

// import { useChat } from "ai/react";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Messages from "./component/messages";
// import InputForm from "./component/inputForm";
// import NavBar from "./component/NavBar";
// import Aside from "./component/Aside";
// import localStorageService from "./Service/localStorage";  // Import localStorage service

// export default function Home() {
//   const router = useRouter();
//   const [isClient, setIsClient] = useState(false);  // State to check if it's client-side
//   const [isAsideOpen, setAsideOpen] = useState(false);

//   // Initialize `history` from localStorage only if on the client
//   const [history, setHistory] = useState<string[]>(() => {
//     if (localStorageService.isBrowser()) {
//       return localStorageService.getHistory();
//     }
//     return [];
//   });

//   // Initialize `messages` from localStorage only if on the client
//   const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
//     api: "/api/genai",
//     initialMessages: localStorageService.isBrowser() ? localStorageService.getMessages() : [],  // Fetch from localStorage only if in browser
//   });

//   useEffect(() => {
//     setIsClient(true);  // Set client-side flag once rendered
//   }, []);

//   // Save history to localStorage when `history` changes, only if client-side
//   useEffect(() => {
//     if (isClient) {
//       localStorageService.saveHistory(history);
//     }
//   }, [history, isClient]);

//   // Save messages to localStorage when `messages` change, only if client-side
//   useEffect(() => {
//     if (isClient) {
//       localStorageService.saveMessages(messages);
//     }
//   }, [messages, isClient]);

//   const [interaction, setInteraction] = useState(false);

//   const handleInteraction = () => {
//     setInteraction(true);
//   };

//   const addToHistory = (input: string) => {
//     setHistory((prevHistory) => {
//       const updatedHistory = [...prevHistory, input];
//       localStorageService.saveHistory(updatedHistory);  // Save to localStorage
//       return updatedHistory;
//     });
//   };

//   const handleLoginSuccess = () => {
//     router.push("/signup");
//   };

//   if (!isClient) {
//     return null;  // Return null on server side to avoid rendering issues
//   }

//   return (
//     <div className="relative min-h-screen from-gray-700 to-gray-800 ">
//       <NavBar setAsideOpen={setAsideOpen} />
//       <Aside isOpen={isAsideOpen} history={history} />
//       <main
//         className={`flex-grow p-8 coolGray-900 transition-all duration-300 ${
//           isAsideOpen ? "ml-64" : "ml-0"
//         }`}
//       >
//         <div className="flex-grow overflow-auto">
//           <Messages
//             messages={messages}
//             isLoading={isLoading}
//             onInteraction={handleInteraction}
//           />
//         </div>
//         <InputForm
//           input={input}
//           handleInputChange={(e) => {
//             handleInputChange(e);
//             handleInteraction();
//           }}
//           handleSubmit={handleSubmit}
//           isLoading={isLoading}
//           stop={stop}
//           addToHistory={addToHistory}
//         />
//       </main>
//     </div>
//   );
// }



// // correct
// "use client";

// import { useChat } from "ai/react";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation"; // Import useRouter
// import Messages from "./component/messages";
// import InputForm from "./component/inputForm";
// import NavBar from "./component/NavBar";
// import Aside from "./component/Aside";

// export default function Home() {
//   const router = useRouter(); // Initialize the router
//   const [isClient, setIsClient] = useState(false);
//   const [isAsideOpen, setAsideOpen] = useState(false);
//   const [history, setHistory] = useState<string[]>([]);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
//     api: "/api/genai",
//   });

//   const [interaction, setInteraction] = useState(false);

//   const handleInteraction = () => {
//     setInteraction(true);
//   };

//   const addToHistory = (input: string) => {
//     setHistory((prevHistory) => [...prevHistory, input]);
//   };

//   const handleLoginSuccess = () => {
//     // Redirect to /signup after successful login
//     router.push("/signup");
//   };

//   // Call this function when login is successful
//   // Example: if you have a login function, call handleLoginSuccess inside it.

//   if (!isClient) {
//     return null;
//   }

//   return (
//     <div className="relative min-h-screen bg-[#111827]">
//       <NavBar setAsideOpen={setAsideOpen} />
//       <Aside isOpen={isAsideOpen} history={history} />
//       <main
//         className={`flex-grow p-8 bg-[#111827] transition-all duration-300 ${
//           isAsideOpen ? "ml-64" : "ml-0"
//         }`}
//       >
//         <div className="flex-grow overflow-auto">
//           <Messages
//             messages={messages}
//             isLoading={isLoading}
//             onInteraction={handleInteraction}
//           />
//         </div>
//         <InputForm
//           input={input}
//           handleInputChange={(e) => {
//             handleInputChange(e);
//             handleInteraction();
//           }}
//           handleSubmit={handleSubmit}
//           isLoading={isLoading}
//           stop={stop}
//           addToHistory={addToHistory}
//         />
//       </main>
//     </div>
//   );
// }

// corect  "use client";
// import { useChat } from "ai/react";
// import { useEffect, useState } from "react";
// import Messages from "./component/messages";
// import InputForm from "./component/inputForm";
// import NavBar from "./component/NavBar";
// import Aside from "./component/Aside";

// export default function Home() {
//   const [isClient, setIsClient] = useState(false);
//   const [isAsideOpen, setAsideOpen] = useState(false);
//   const [history, setHistory] = useState<string[]>([]);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
//     api: "/api/genai",
//   });

//   const [interaction, setInteraction] = useState(false);

//   const handleInteraction = () => {
//     setInteraction(true);
//   };

//   const addToHistory = (input: string) => {
//     setHistory((prevHistory) => [...prevHistory, input]);
//   };

//   if (!isClient) {
//     return null;
//   }

//   return (
//     <div className="relative min-h-screen bg-[#111827]">
//       <NavBar setAsideOpen={setAsideOpen} />
//       <Aside isOpen={isAsideOpen} history={history} />
//       <main
//         className={`flex-grow p-8 bg-[#111827] transition-all duration-300 ${
//           isAsideOpen ? "ml-64" : "ml-0"
//         }`}
//       >
//         <div className="flex-grow overflow-auto">
//           <Messages
//             messages={messages}
//             isLoading={isLoading}
//             onInteraction={handleInteraction}
//           />
//         </div>
//         <InputForm
//           input={input}
//           handleInputChange={(e) => {
//             handleInputChange(e);
//             handleInteraction();
//           }}
//           handleSubmit={handleSubmit}
//           isLoading={isLoading}
//           stop={stop}
//           addToHistory={addToHistory}
//         />
//       </main>
//     </div>
//   );
// }



// "use client";

// import { useChat } from "ai/react";
// import { useEffect, useState } from "react";
// import Messages from "./component/messages";
// import InputForm from "./component/inputForm";
// import NavBar from "./component/NavBar";
// import Aside from "./component/Aside";  // Ensure this import is correct

// export default function Home() {
//   const [isClient, setIsClient] = useState(false);
//   const [isAsideOpen, setAsideOpen] = useState(false);
//   const [history, setHistory] = useState<string[]>([]);  // Make sure history is initialized correctly

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
//     api: "/api/genai",
//   });

//   const [interaction, setInteraction] = useState(false);

//   const handleInteraction = () => {
//     setInteraction(true);
//   };

//   const addToHistory = (input: string) => {
//     setHistory((prevHistory) => [...prevHistory, input]);
//   };

//   if (!isClient) {
//     return null;
//   }

//   return (
//     <div className="">
//       <NavBar setAsideOpen={setAsideOpen} />
//       <Aside isOpen={isAsideOpen} history={history} />  {/* Pass history here */}
//       <main
//         className={`flex-grow min-h-screen p-8 bg-[#111827] transition-all duration-300 ${
//           isAsideOpen ? "ml-64" : "ml-0"
//         }`}
//       >
//         <div className="flex-grow overflow-auto">
//           <Messages
//             messages={messages}
//             isLoading={isLoading}
//             onInteraction={handleInteraction}
//           />
//         </div>
//         <InputForm
//           input={input}
//           handleInputChange={(e) => {
//             handleInputChange(e);
//             handleInteraction();
//           }}
//           handleSubmit={handleSubmit}
//           isLoading={isLoading}
//           stop={stop}
//           addToHistory={addToHistory}  // Pass the function to InputForm
//         />
//       </main>
//     </div>
//   );
// }
