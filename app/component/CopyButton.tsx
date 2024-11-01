import React from "react";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { useState } from "react";

type Props = {
  text: string;
};

const CopyButton = ({ text }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <button onClick={handleCopy} className=" flex items-center gap-2 mt-2">
      {copied ? (
        <ClipboardCheck className="h-5 w-5 text-green-500" />
      ) : (
        <Clipboard className="h-5 w-5 text-gray-500 hover:text-black" />
      )}
      <span className="text-sm text-gray-500 hover:text-black">Copy</span>
    </button>
  );
};

export default CopyButton;

