import {
  Loader2,
  Paperclip,
  Send,
  Mic,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";
import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useRef,
  useEffect,
} from "react";
import SelectedImages from "./selectedImages";
import { ChatRequestOptions } from "ai";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions,
  ) => void;
  input: string;
  isLoading: boolean;
  stop: () => void;
  addToHistory: (input: string) => void;
  isAsideOpen: boolean;
};

const InputForm = ({
  handleInputChange,
  handleSubmit,
  input,
  isLoading,
  stop,
  addToHistory,
  isAsideOpen,
}: Props) => {
  const [images, setImages] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleImageSelection = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    if (files.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    const imagePromises = Array.from(files).map((file) => {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`File ${file.name} exceeds 5MB limit`);
        return Promise.reject("File too large");
      }

      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64String = e.target?.result?.toString();
          resolve(base64String as string);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    });

    try {
      const base64Strings = await Promise.all(imagePromises);
      setImages((prevImages) => [...prevImages, ...base64Strings]);
      toast.success("Images uploaded successfully");
    } catch (error) {
      console.error("Error reading image:", error);
      toast.error("Failed to upload one or more images");
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim() && images.length === 0) {
      toast.error("Please enter a message or upload an image");
      return;
    }

    handleSubmit(event, {
      data: {
        images: JSON.stringify(images),
      },
    });

    if (input.trim()) {
      addToHistory(input);
    }

    // Clear images after submission
    setImages([]);
  };

  return (
    <div
      className={`sticky bottom-0 left-0 right-0 z-50 overflow-hidden shadow-xl transition-all duration-300 ${isAsideOpen ? "ml-72" : "ml-0"}`}
    >
      <div className="bg-gradient-to-t from-gray-900 to-transparent h-20 w-full absolute bottom-full left-0 pointer-events-none"></div>

      <form
        onSubmit={handleFormSubmit}
        className="flex items-center gap-3 p-4 max-w-5xl mx-auto w-full bg-customDark border-t border-gray-800 backdrop-blur-sm bg-opacity-90"
      >
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => document.getElementById("fileInput")?.click()}
            className="rounded-full h-10 w-10 text-gray-300 hover:text-blue-400 hover:bg-gray-800 transition-all duration-300"
          >
            <ImageIcon className="h-5 w-5" />
            <span className="sr-only">Upload image</span>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full h-10 w-10 text-gray-300 hover:text-blue-400 hover:bg-gray-800 transition-all duration-300"
          >
            <Mic className="h-5 w-5" />
            <span className="sr-only">Voice input</span>
          </Button>

          <SelectedImages images={images} setImages={setImages} />
        </div>

        <input
          className="hidden"
          id="fileInput"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageSelection}
        />

        <div className="flex-grow relative">
          <div
            className={`absolute inset-0 rounded-full ${isFocused ? "ring-2 ring-blue-500 ring-opacity-50" : ""} transition-all duration-300 pointer-events-none`}
          ></div>
          <Input
            ref={inputRef}
            type="text"
            placeholder={
              isLoading ? "Generating response..." : "Ask Genius AI anything..."
            }
            value={input}
            disabled={isLoading}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full py-6 px-5 bg-gray-800/80 text-white rounded-full border border-gray-700 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0 placeholder:text-gray-400 transition-all duration-300 shadow-inner"
          />
          {input.length > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() =>
                handleInputChange({
                  target: { value: "" },
                } as ChangeEvent<HTMLInputElement>)
              }
              className="absolute right-14 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full text-gray-400 hover:text-gray-300 hover:bg-gray-700/50 transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              <span className="sr-only">Clear input</span>
            </Button>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading && !input.trim() && images.length === 0}
          className="rounded-full h-12 w-12 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
        >
          {isLoading ? (
            <Loader2 onClick={stop} className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  );
};

export default InputForm;
