// corect 

import { Loader2, Plus, Paperclip } from "lucide-react";
import { TbCircleArrowUpFilled } from "react-icons/tb";
import React, { ChangeEvent, FormEvent, useState } from "react";
import SelectedImages from "./selectedImages";
import { ChatRequestOptions } from "ai";

type Props = {
  handleInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions) => void;
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

  const handleImageSelection = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const imagePromises = Array.from(files).map((file) => {
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
    } catch (error) {
      console.error("Error reading image:", error);
    }
  };

  return (
    <div
      className={`sticky bottom-0 left-0 right-0 z-50 overflow-hidden shadow-md transition-all duration-300 ${
        isAsideOpen ? "ml-55" : "ml-0"
      }`}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(event, {
            data: {
              images: JSON.stringify(images),
            },
          });
          addToHistory(input);
        }}
        className="flex items-center gap-2 p-4 max-w-4xl mx-auto w-full"
        style={{ backgroundColor: "rgb(32,32,33)" }}
      >
        <div className="flex items-center relative">
          <Paperclip
            onClick={() => document.getElementById("fileInput")?.click()}
            className="cursor-pointer p-3 h-10 w-10 stroke-gray-300 hover:bg-gray-500"
          />
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
        <input
          type="text"
          placeholder={isLoading ? "Generating . . ." : "Ask Something . . ."}
          value={input}
          disabled={isLoading}
          onChange={handleInputChange}
          className="flex-grow text-gray-200 border-b border-dashed outline-none w-full py-2 placeholder:text-gray-400 bg-transparent rounded-xl ml-2"
        />
        <button
          type="submit"
          className="rounded flex items-center justify-center p-2 ml-2 hover:bg-gray-600 transition-colors"
        >
          {isLoading ? (
            <Loader2
              onClick={stop}
              className="h-10 w-10 stroke-stone-500 animate-spin"
            />
          ) : (
            <TbCircleArrowUpFilled className="h-10 w-10 stroke-gray-300" />
          )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;
