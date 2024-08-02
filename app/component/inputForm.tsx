import { Loader2, Plus, Send } from "lucide-react";
import React, {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";
import SelectedImages from "./selectedImages";
import { ChatRequestOptions } from "ai";

type Props = {
  handleInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions) => void;
  input: string;
  isLoading: boolean;
  stop: () => void;
};

const InputForm = ({
  handleInputChange,
  handleSubmit,
  input,
  isLoading,
  stop
}: Props) => {
  const [images, setImages] = useState<string[]>([]);
  
  const handleImageSelection = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    
    const imagePromises = Array.from(files).map(file => {
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
      setImages(prevImages => [...prevImages, ...base64Strings]);
    } catch (error) {
      console.error("Error reading image:", error);
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(event, {
          data: {
            images: JSON.stringify(images),
          },
        });
      }}
      className="fixed bottom-0 left-0 right-0 flex items-center gap-2 p-4 bg-[#111827] shadow-md"
    >
      <div className="border flex items-center relative">
        <Plus
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
        placeholder={isLoading ? "  Generating . . ." : "  Ask Something . . . "}
        value={input}
        disabled={isLoading}
        onChange={handleInputChange}
        className=" border-b border-dashed outline-none w-full py-2 text-[#000000] disabled:bg-transparent rounded-xl"
      />
      <button
        type="submit"
        className="rounded-full shadow-md border flex items-center justify-center p-2 ml-2"
      >
        {isLoading ? (
          <Loader2
            onClick={stop}
            className="h-10 w-10 stroke-stone-500 animate-spin"
          />
        ) : (
          <Send className="h-8 w-8 stroke-gray-300 hover:bg-gray-500" />
        )}
      </button>
    </form>
  );
};

export default InputForm;
