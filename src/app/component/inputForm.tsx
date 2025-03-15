import { Loader2, Paperclip, Send } from "lucide-react";
import { TbCircleArrowUpFilled } from "react-icons/tb";
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
      className={`sticky bottom-0 left-0 right-0 z-50 overflow-hidden shadow-lg transition-all duration-300 ${isAsideOpen ? "ml-64" : "ml-0"}`}
    >
      <form
        onSubmit={handleFormSubmit}
        className="flex items-center gap-2 p-4 max-w-5xl mx-auto w-full bg-customDark border-t border-gray-800"
      >
        <div className="flex items-center relative">
          <button
            type="button"
            onClick={() => document.getElementById("fileInput")?.click()}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Paperclip className="h-5 w-5 text-gray-300" />
          </button>
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
          <input
            ref={inputRef}
            type="text"
            placeholder={
              isLoading ? "Generating response..." : "Ask Genius AI anything..."
            }
            value={input}
            disabled={isLoading}
            onChange={handleInputChange}
            className="w-full py-3 px-4 bg-gray-800 text-white rounded-full border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400 transition-all duration-200"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading && !input.trim() && images.length === 0}
          className="rounded-full p-3 bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 onClick={stop} className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;
