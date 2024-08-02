import React from "react";
import { Copy } from "lucide-react";

type Props = {
  text: string;
};

const CopyButton = ({ text }: Props) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 border rounded-full p-1 shadow-lg hover:bg-gray-300"
    >
      <Copy />
    </button>
  );
};

export default CopyButton;