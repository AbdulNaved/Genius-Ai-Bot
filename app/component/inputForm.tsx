//correct
import { Loader2, Plus,Paperclip } from "lucide-react";
//import { FaCircleArrowUp } from "react-icons/fa6";
import React, { ChangeEvent, FormEvent, useState } from "react";
import SelectedImages from "./selectedImages";
import { ChatRequestOptions } from "ai";
import { TbCircleArrowUpFilled } from "react-icons/tb";
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
      className={`sticky bottom-0  left-0 right-0 z-50 overflow-hidden shadow-md transition-all duration-300 ${isAsideOpen ? "ml-64" : "ml-0"}`}
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
        className="flex items-center gap-2 p-4"
        style={{ backgroundColor: 'rgb(32,32,33)' }} // Applied custom RGB color
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
          className="flex border-b border-dashed outline-none w-full py-2 text-gray-200 disabled:bg-transparent rounded-xl ml-2 placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="rounded  flex items-center justify-center p-2 ml-2"
          
        >
          {isLoading ? (
            <Loader2 onClick={stop} className="h-10 w-10 stroke-stone-500 animate-spin" />
          ) : (
            <TbCircleArrowUpFilled className="h-10 w-10 stroke-gray-300 " />
          )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;

// // corect 
// import { Loader2, Plus, Send } from "lucide-react";
// import React, { ChangeEvent, FormEvent, useState } from "react";
// import SelectedImages from "./selectedImages";
// import { ChatRequestOptions } from "ai";

// type Props = {
//   handleInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
//   handleSubmit: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions) => void;
//   input: string;
//   isLoading: boolean;
//   stop: () => void;
//   addToHistory: (input: string) => void;
//   isAsideOpen: boolean;
// };

// const InputForm = ({
//   handleInputChange,
//   handleSubmit,
//   input,
//   isLoading,
//   stop,
//   addToHistory,
//   isAsideOpen,
// }: Props) => {
//   const [images, setImages] = useState<string[]>([]);

//   const handleImageSelection = async (event: ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (!files) return;

//     const imagePromises = Array.from(files).map((file) => {
//       return new Promise<string>((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           const base64String = e.target?.result?.toString();
//           resolve(base64String as string);
//         };
//         reader.onerror = (error) => reject(error);
//         reader.readAsDataURL(file);
//       });
//     });

//     try {
//       const base64Strings = await Promise.all(imagePromises);
//       setImages((prevImages) => [...prevImages, ...base64Strings]);
//     } catch (error) {
//       console.error("Error reading image:", error);
//     }
//   };

//   return (
//     <div
//       className={`sticky bottom-0 left-0 right-0 z-50  overflow-hidden shadow-md transition-all duration-300 ${isAsideOpen ? "ml-64" : "ml-0"}`}
//     >
//       <form
//         onSubmit={(event) => {
//           event.preventDefault();
//           handleSubmit(event, {
//             data: {
//               images: JSON.stringify(images),
//             },
//           });
//           addToHistory(input);
//         }}
//         className="flex items-center gap-2 p-4 bg-[#111827] shadow-md w-full max-w-4xl mx-auto"
//       >
//         <div className="flex items-center relative">
//           <Plus
//             onClick={() => document.getElementById("fileInput")?.click()}
//             className="cursor-pointer p-3 h-10 w-10 stroke-gray-300 hover:bg-gray-500"
//           />
//           <SelectedImages images={images} setImages={setImages} />
//         </div>

//         <input
//           className="hidden"
//           id="fileInput"
//           type="file"
//           accept="image/*"
//           multiple
//           onChange={handleImageSelection}
//         />
//         <input
//           type="text"
//           placeholder={isLoading ? "Generating . . ." : "Ask Something . . ."}
//           value={input}
//           disabled={isLoading}
//           onChange={handleInputChange}
//           className="flex border-b border-dashed outline-none w-full py-2 text-[#000000] disabled:bg-transparent rounded-xl ml-2 placeholder:text-gray-400"
//         />
//         <button
//           type="submit"
//           className="rounded-full shadow-md border flex items-center justify-center p-2 ml-2"
//         >
//           {isLoading ? (
//             <Loader2 onClick={stop} className="h-10 w-10 stroke-stone-500 animate-spin" />
//           ) : (
//             <Send className="h-8 w-8 stroke-gray-300 hover:bg-gray-500" />
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default InputForm;


// import { Loader2, Plus, Send } from "lucide-react";
// import React, { ChangeEvent, FormEvent, useState } from "react";
// import SelectedImages from "./selectedImages";
// import { ChatRequestOptions } from "ai";

// type Props = {
//   handleInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
//   handleSubmit: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions) => void;
//   input: string;
//   isLoading: boolean;
//   stop: () => void;
//   addToHistory: (input: string) => void;
//   isAsideOpen: boolean; // Add this prop to control responsiveness
// };

// const InputForm = ({
//   handleInputChange,
//   handleSubmit,
//   input,
//   isLoading,
//   stop,
//   addToHistory,
//   isAsideOpen, // Accept the prop
// }: Props) => {
//   const [images, setImages] = useState<string[]>([]);

//   const handleImageSelection = async (event: ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (!files) return;

//     const imagePromises = Array.from(files).map((file) => {
//       return new Promise<string>((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           const base64String = e.target?.result?.toString();
//           resolve(base64String as string);
//         };
//         reader.onerror = (error) => reject(error);
//         reader.readAsDataURL(file);
//       });
//     });

//     try {
//       const base64Strings = await Promise.all(imagePromises);
//       setImages((prevImages) => [...prevImages, ...base64Strings]);
//     } catch (error) {
//       console.error("Error reading image:", error);
//     }
//   };

//   return (
//     <div className={`fixed bottom-0 left-0 right-0 z-50 bg-white-500 shadow-md overflow-auto transition-all duration-300 ${isAsideOpen ? 'ml-64' : 'ml-0'}`}>
//       <form
//         onSubmit={(event) => {
//           event.preventDefault();
//           handleSubmit(event, {
//             data: {
//               images: JSON.stringify(images),
//             },
//           });
//           addToHistory(input); // Add the input to history on submit
//         }}
//         className="flex items-center gap-2 p-4 bg-[#111827] shadow-md overflow-hidden w-full max-w-4xl mx-auto" // Adjusted classes for responsiveness
//       >
//         <div className="flex items-center relative">
//           <Plus
//             onClick={() => document.getElementById("fileInput")?.click()}
//             className="cursor-pointer p-3 h-10 w-10 stroke-gray-300 hover:bg-gray-500"
//           />
//           <SelectedImages images={images} setImages={setImages} />
//         </div>
       
//         <input
//           className="hidden "
//           id="fileInput"
//           type="file"
//           accept="image/*"
//           multiple
//           onChange={handleImageSelection}
//         />
//         <input
//           type="text"
//           placeholder={isLoading ? "Generating . . ." : "Ask Something . . .  "}
//           value={input}
//           disabled={isLoading}
//           onChange={handleInputChange}
//           className="flex border-b border-dashed outline-none w-full py-2 text-[#000000] disabled:bg-transparent rounded-xl ml-2 placeholder:text-gray-400"
//         />
//         <button
//           type="submit"
//           className="rounded-full shadow-md border flex items-center justify-center p-2 ml-2"
//         >
//           {isLoading ? (
//             <Loader2
//               onClick={stop}
//               className="h-10 w-10 stroke-stone-500 animate-spin"
//             />
//           ) : (
//             <Send className="h-8 w-8 stroke-gray-300 hover:bg-gray-500" />
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default InputForm;



// import { Loader2, Plus, Send } from "lucide-react";
// import React, { ChangeEvent, FormEvent, useState } from "react";
// import SelectedImages from "./selectedImages";
// import { ChatRequestOptions } from "ai";

// type Props = {
//   handleInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
//   handleSubmit: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions) => void;
//   input: string;
//   isLoading: boolean;
//   stop: () => void;
//   addToHistory: (input: string) => void;
// };

// const InputForm = ({
//   handleInputChange,
//   handleSubmit,
//   input,
//   isLoading,
//   stop,
//   addToHistory,
// }: Props) => {
//   const [images, setImages] = useState<string[]>([]);

//   const handleImageSelection = async (event: ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (!files) return;

//     const imagePromises = Array.from(files).map((file) => {
//       return new Promise<string>((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           const base64String = e.target?.result?.toString();
//           resolve(base64String as string);
//         };
//         reader.onerror = (error) => reject(error);
//         reader.readAsDataURL(file);
//       });
//     });

//     try {
//       const base64Strings = await Promise.all(imagePromises);
//       setImages((prevImages) => [...prevImages, ...base64Strings]);
//     } catch (error) {
//       console.error("Error reading image:", error);
//     }
//   };

//   return (
//     <div className="fixed flex-col bottom-0 left-0 right-0 z-50 bg-red-500 shadow-md overflow-auto ">
//       <form
//         onSubmit={(event) => {
//           event.preventDefault();
//           handleSubmit(event, {
//             data: {
//               images: JSON.stringify(images),
//             },
//           });
//           addToHistory(input); // Add the input to history on submit
//         }}
//         className="flex items-center gap-2 p-4 bg-[#111827] shadow-md overflow-hidden"
//       >
//         <div className="flex items-center relative">
//           <Plus
//             onClick={() => document.getElementById("fileInput")?.click()}
//             className="cursor-pointer p-3 h-10 w-10 stroke-gray-300 hover:bg-gray-500"
//           />
//           <SelectedImages images={images} setImages={setImages} />
//         </div>
       
//         <input
//           className="hidden "
//           id="fileInput"
//           type="file"
//           accept="image/*"
//           multiple
//           onChange={handleImageSelection}
//         />
//         <input
//           type="text"
//           placeholder={isLoading ? "Generating . . ." : "Ask Something . . .  " }
//           value={input}
//           disabled={isLoading}
//           onChange={handleInputChange}
//           className="flex border-b border-dashed outline-none w-full py-2 text-[#000000] disabled:bg-transparent rounded-xl ml-2 placeholder:text-gray-400  "
//         />
//         <button
//           type="submit"
//           className="rounded-full shadow-md border flex items-center justify-center p-2 ml-2"
//         >
//           {isLoading ? (
//             <Loader2
//               onClick={stop}
//               className="h-10 w-10 stroke-stone-500 animate-spin"
//             />
//           ) : (
//             <Send className="h-8 w-8 stroke-gray-300 hover:bg-gray-500" />
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default InputForm;

// import { Loader2, Plus, Send } from "lucide-react";
// import React, { ChangeEvent, FormEvent, useState } from "react";
// import SelectedImages from "./selectedImages";
// import { ChatRequestOptions } from "ai";

// type Props = {
//   handleInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
//   handleSubmit: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions) => void;
//   input: string;
//   isLoading: boolean;
//   stop: () => void;
//   addToHistory: (input: string) => void;
// };

// const InputForm = ({
//   handleInputChange,
//   handleSubmit,
//   input,
//   isLoading,
//   stop,
//   addToHistory,
// }: Props) => {
//   const [images, setImages] = useState<string[]>([]);

//   const handleImageSelection = async (event: ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (!files) return;

//     const imagePromises = Array.from(files).map((file) => {
//       return new Promise<string>((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           const base64String = e.target?.result?.toString();
//           resolve(base64String as string);
//         };
//         reader.onerror = (error) => reject(error);
//         reader.readAsDataURL(file);
//       });
//     });

//     try {
//       const base64Strings = await Promise.all(imagePromises);
//       setImages((prevImages) => [...prevImages, ...base64Strings]);
//     } catch (error) {
//       console.error("Error reading image:", error);
//     }
//   };

//   return (
//     <div className="fixed bottom-0 left-0 right-0 z-50 bg-red-500 shadow-md overflow-auto ">
//       <form
//         onSubmit={(event) => {
//           event.preventDefault();
//           handleSubmit(event, {
//             data: {
//               images: JSON.stringify(images),
//             },
//           });
//           addToHistory(input); // Add the input to history on submit
//         }}
//         className="flex items-center gap-2 p-4 bg-[#111827] shadow-md overflow-hidden"
//       >
//         <div className="flex items-center relative">
//           <Plus
//             onClick={() => document.getElementById("fileInput")?.click()}
//             className="cursor-pointer p-3 h-10 w-10 stroke-gray-300 hover:bg-gray-500"
//           />
//           <SelectedImages images={images} setImages={setImages} />
//         </div>
//         <input
//           className="hidden"
//           id="fileInput"
//           type="file"
//           accept="image/*"
//           multiple
//           onChange={handleImageSelection}
//         />
//         <input
//           type="text"
//           placeholder={isLoading ? "Generating . . ." : "Ask Something . . .  " }
//           value={input}
//           disabled={isLoading}
//           onChange={handleInputChange}
//           className="flex border-b border-dashed outline-none w-full py-2 text-[#000000] disabled:bg-transparent rounded-xl ml-2 placeholder:text-gray-400  "
//         />
//         <button
//           type="submit"
//           className="rounded-full shadow-md border flex items-center justify-center p-2 ml-2"
//         >
//           {isLoading ? (
//             <Loader2
//               onClick={stop}
//               className="h-10 w-10 stroke-stone-500 animate-spin"
//             />
//           ) : (
//             <Send className="h-8 w-8 stroke-gray-300 hover:bg-gray-500" />
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default InputForm;



// import { Loader2, Plus, Send } from "lucide-react";
// import React, { ChangeEvent, FormEvent, useState } from "react";
// import SelectedImages from "./selectedImages";
// import { ChatRequestOptions } from "ai";

// type Props = {
//   handleInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
//   handleSubmit: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions) => void;
//   input: string;
//   isLoading: boolean;
//   stop: () => void;
// };

// const InputForm = ({
//   handleInputChange,
//   handleSubmit,
//   input,
//   isLoading,
//   stop,
// }: Props) => {
//   const [images, setImages] = useState<string[]>([]);

//   const handleImageSelection = async (event: ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (!files) return;

//     const imagePromises = Array.from(files).map((file) => {
//       return new Promise<string>((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           const base64String = e.target?.result?.toString();
//           resolve(base64String as string);
//         };
//         reader.onerror = (error) => reject(error);
//         reader.readAsDataURL(file);
//       });
//     });

//     try {
//       const base64Strings = await Promise.all(imagePromises);
//       setImages((prevImages) => [...prevImages, ...base64Strings]);
//     } catch (error) {
//       console.error("Error reading image:", error);
//     }
//   }; // <-- Fixed closing of handleImageSelection function

//   return (
//     <div className="sticky top-0 z-50 bg-white shadow-md overflow-hidden"> 
//       <form
//         onSubmit={(event) => {
//           event.preventDefault();
//           handleSubmit(event, {
//             data: {
//               images: JSON.stringify(images),
//             },
//           });
//         }}
//         className="flex items-center gap-2 p-4 bg-[#111827] shadow-md overflow-hidden" 
//       >
//         <div className="flex items-center relative">
//           <Plus
//             onClick={() => document.getElementById("fileInput")?.click()}
//             className="cursor-pointer p-3 h-10 w-10 stroke-gray-300 hover:bg-gray-500"
//           />
//           <SelectedImages images={images} setImages={setImages} />
//         </div>
//         <input
//           className="hidden"
//           id="fileInput"
//           type="file"
//           accept="image/*"
//           multiple
//           onChange={handleImageSelection}
//         />
//         <input
//           type="text"
//           placeholder={isLoading ? "Generating . . ." : "Ask Something . . . "}
//           value={input}
//           disabled={isLoading}
//           onChange={handleInputChange}
//           className="border-b border-dashed outline-none w-full py-2 text-[#000000] disabled:bg-transparent rounded-xl ml-3 placeholder:text-gray-400" 
//         />
//         <button
//           type="submit"
//           className="rounded-full shadow-md border flex items-center justify-center p-2 ml-2"
//         >
//           {isLoading ? (
//             <Loader2
//               onClick={stop}
//               className="h-10 w-10 stroke-stone-500 animate-spin"
//             />
//           ) : (
//             <Send className="h-8 w-8 stroke-gray-300 hover:bg-gray-500" />
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default InputForm;
