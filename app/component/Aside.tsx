//correct
import React from "react";

type AsideProps = {
  isOpen: boolean;
  history: string[];
};

const Aside = ({ isOpen, history }: AsideProps) => {
  return (
    <aside
      className={`mt-10   font-serif text-white   fixed top-0 left-0 overflow-hidden shadow-lg transition-transform duration-300 ease-in-out ${
        isOpen ? "w-64 h-screen translate-x-0" : "w-0 h-screen -translate-x-full"
      }`}
      style={{
        overflowY: "auto", // Enable vertical scrolling
      }}
      aria-hidden={!isOpen} // Improve accessibility
    >
      <h2 className={`text-lg font-bold p-4 ${isOpen ? "block" : "hidden"}`}>
        History
      </h2>
      <ul className={`p-2 space-y-2 ${isOpen ? "block" : "hidden"}`}>
        {history.length > 0 ? (
          history.map((item, index) => (
            <li
              key={index}
              className="text-white    p-2 rounded shadow-sm text-sm"
              style={{
                whiteSpace: "nowrap", // Prevent text from wrapping
                overflow: "hidden", // Hide overflowed text
                textOverflow: "ellipsis", // Add ellipsis for overflowing text
              }}
            >
              {item.length > 30 ? `${item.slice(0, 30)}...` : item}
            </li>
          ))
        ) : (
          <li className=" text-white">No history yet</li>
        )}
      </ul>
    </aside>
  );
};

export default Aside;



// import React from "react";

// type AsideProps = {
//   isOpen: boolean;
//   history: string[];
// };

// const Aside = ({ isOpen, history }: AsideProps) => {
//   return (
//     <aside
//       className={`fixed top-0 left-0 bg-slate-300 shadow-lg transition-transform duration-300 ease-in-out ${
//         isOpen ? "w-64 h-screen translate-x-0" : "w-0 h-screen -translate-x-full"
//       }`}
//       style={{
//         overflowY: "auto",
//       }}
//       aria-hidden={!isOpen}
//     >
//       <h2 className={`text-lg font-bold p-4 ${isOpen ? "block" : "hidden"}`}>
//         History
//       </h2>
//       <ul className={`p-2 space-y-2 ${isOpen ? "block" : "hidden"}`}>
//         {history.length > 0 ? (
//           history.map((item, index) => (
//             <li
//               key={index}
//               className="bg-white p-2 rounded shadow-sm text-sm"
//               style={{
//                 whiteSpace: "nowrap",
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//               }}
//             >
//               {item.length > 20 ? `${item.slice(0, 20)}...` : item}
//             </li>
//           ))
//         ) : (
//           <li className="text-gray-500">No history yet</li>
//         )}
//       </ul>
//     </aside>
//   );
// };

// export default Aside;




// import React from "react";

// type AsideProps = {
//   isOpen: boolean;
//   history: string[];
// };

// const Aside = ({ isOpen, history }: AsideProps) => {
//   return (
//     <aside
//       className={`fixed top-0 left-0 bg-gray-200 shadow-lg transition-transform duration-300 ${
//         isOpen ? "w-64 h-screen translate-x-0" : "w-0 h-screen translate-x-[-100%]"
//       }`}
//       style={{
//         overflowY: "auto", // Enable vertical scrolling
//       }}
//     >
//       <h2 className={`text-lg font-bold p-4 ${isOpen ? "block" : "hidden"}`}>
//         History
//       </h2>
//       <ul className={`p-2 space-y-2 ${isOpen ? "block" : "hidden"}`}>
//         {history.length > 0 ? (
//           history.map((item, index) => (
//             <li
//               key={index}
//               className="bg-white p-2 rounded shadow-sm text-sm"
//               style={{
//                 whiteSpace: "nowrap", // Prevent text from wrapping
//                 overflow: "hidden", // Hide overflowed text
//                 textOverflow: "ellipsis", // Add ellipsis for overflowing text
//               }}
//             >
//               {item.length > 20 ? `${item.slice(0, 20)}...` : item}
//             </li>
//           ))
//         ) : (
//           <li className="text-gray-500">No history yet</li>
//         )}
//       </ul>
//     </aside>
//   );
// };

// export default Aside;



// import React from "react";

// type AsideProps = {
//   isOpen: boolean;
//   history: string[];
// };

// const Aside = ({ isOpen, history }: AsideProps) => {
//   return (
//     <aside
//       className={`fixed top-0 left-0 bg-gray-200 shadow-lg transition-transform duration-300 ${
//         isOpen ? "w-64 h-screen translate-x-0" : "w-0 h-screen translate-x-[-100%]"
//       }`}
//       style={{
//         overflowY: "auto", // Enable vertical scrolling
//       }}
//     >
//       <h2 className={`text-lg font-bold p-4 ${isOpen ? "block" : "hidden"}`}>
//         History
//       </h2>
//       <ul className={`p-2 space-y-2 ${isOpen ? "block" : "hidden"}`}>
//         {history.length > 0 ? (
//           history.map((item, index) => (
//             <li
//               key={index}
//               className="bg-white p-2 rounded shadow-sm text-sm"
//               style={{
//                 whiteSpace: "nowrap", // Prevent text from wrapping
//                 overflow: "hidden", // Hide overflowed text
//                 textOverflow: "ellipsis", // Add ellipsis for overflowing text
//               }}
//             >
//               {item.length > 20 ? `${item.slice(0, 20)}...` : item}
//             </li>
//           ))
//         ) : (
//           <li className="text-gray-500">No history yet</li>
//         )}
//       </ul>
//     </aside>
//   );
// };

// export default Aside;



// import React from "react";

// type AsideProps = {
//   isOpen: boolean;
//   history: string[];
// };

// const Aside = ({ isOpen, history }: AsideProps) => {

//   return (
//     <aside
//       className={`fixed top-0 left-0 bg-gray-200 shadow-lg transition-all ${
//         isOpen ? "w-64 h-full translate-x-0" : "w-0 h-0 translate-x-[-100%]"
//       }`}
//       style={{
//         overflowY: "auto", // Enable vertical scrolling
//         maxHeight: "calc(100vh - 60px)", // Ensure it does not exceed viewport height, adjust as needed
//       }}
//     >
//       <h2 className={`text-lg font-bold p-4 ${isOpen ? "block" : "hidden"}`}>
//         History
//       </h2>
//       <ul className={`p-2 space-y-2 ${isOpen ? "block" : "hidden"}`}>
//         {history.length > 0 ? (
//           history.map((item, index) => (
//             <li
//               key={index}
//               className="bg-white p-2 rounded shadow-sm text-sm"
//               style={{
//                 whiteSpace: "nowrap", // Prevent text from wrapping
//                 overflow: "hidden", // Hide overflowed text
//                 textOverflow: "ellipsis", // Add ellipsis for overflowing text
//               }}
//             >
//               {item.length > 30 ? `${item.slice(0, 30)}...` : item}
//             </li>
//           ))
//         ) : (
//           <li className="text-gray-500">No history yet</li>
//         )}
//       </ul>
//     </aside>
//   );
// };

// export default Aside;

