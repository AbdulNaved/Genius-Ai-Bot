import React from "react";
import { History, MessageSquare, Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type AsideProps = {
  isOpen: boolean;
  history: string[];
};

const Aside = ({ isOpen, history }: AsideProps) => {
  return (
    <aside
      className={`mt-16 font-sans text-white fixed top-0 left-0 overflow-hidden shadow-xl transition-all duration-500 ease-in-out ${isOpen ? "w-72 h-screen translate-x-0" : "w-0 h-screen -translate-x-full"}`}
      style={{
        overflowY: "auto",
        background:
          "linear-gradient(to bottom, rgba(17, 24, 39, 0.95), rgba(17, 24, 39, 0.98))",
        backdropFilter: "blur(10px)",
        borderRight: isOpen ? "1px solid rgba(75, 85, 99, 0.3)" : "none",
      }}
      aria-hidden={!isOpen}
    >
      <div
        className={`sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10 border-b border-gray-800 ${isOpen ? "block" : "hidden"}`}
      >
        <div className="flex items-center gap-2 p-4">
          <History className="h-5 w-5 text-blue-500" />
          <h2 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Chat History
          </h2>
        </div>
      </div>

      <div className={`p-3 ${isOpen ? "block" : "hidden"}`}>
        {history.length > 0 ? (
          <ul className="space-y-3">
            {history.map((item, index) => (
              <li
                key={index}
                className="group relative bg-gray-800/50 hover:bg-gray-800/80 p-3 rounded-lg shadow-md text-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-2">
                  <MessageSquare className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 overflow-hidden">
                    <p className="text-white font-medium truncate">
                      {item.length > 35 ? `${item.slice(0, 35)}...` : item}
                    </p>
                    <div className="flex items-center text-xs text-gray-400 mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Just now</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-400 hover:text-red-400 hover:bg-gray-700/50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400">
            <History className="h-10 w-10 mb-2 text-gray-500 opacity-50" />
            <p className="text-center">No history yet</p>
            <p className="text-xs text-center mt-1 text-gray-500">
              Your chat history will appear here
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Aside;
