import React, { useState, useEffect, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Avatar from "react-avatar";
import { PiSignOutBold } from "react-icons/pi";
import Link from "next/link";

type NavBarProps = {
  setAsideOpen: (isOpen: boolean) => void;
};

const NavBar = ({ setAsideOpen }: NavBarProps) => {
  const [isAsideOpen, setAsideOpenState] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleAside = () => {
    const newState = !isAsideOpen;
    setAsideOpenState(newState);
    setAsideOpen(newState); // Update parent state
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="text-white sticky top-0 left-0 right-0 z-50 shadow-md flex justify-between items-center h-16 px-6 bg-customDark border-b border-gray-800">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <GiHamburgerMenu
            size={24}
            className="hover:bg-gray-700 p-1 rounded cursor-pointer transition-colors duration-200"
            onClick={toggleAside}
          />
          <h1 className="ml-4 text-xl font-semibold hidden sm:block">
            Genius AI
          </h1>
        </div>
      </div>
      <div className="relative" ref={dropdownRef}>
        <Avatar
          size="40"
          className="rounded-full cursor-pointer border-2 border-gray-700 hover:border-blue-500 transition-all duration-200"
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=genius"
          onClick={toggleDropdown}
        />
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-gray-900 rounded-lg shadow-lg z-10 border border-gray-800 animate-fade-in">
            <div className="flex justify-center items-center mt-4 py-2">
              <Avatar
                size="70"
                className="rounded-full border-2 border-blue-500"
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=genius"
              />
            </div>
            <div className="py-3 px-4">
              <p className="flex justify-center text-xl font-medium mb-3 text-white">
                Hello 🙌
              </p>
              <div className="space-y-2">
                <Link
                  href="/login"
                  className="block w-full px-4 py-2 text-center rounded-md bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block w-full px-4 py-2 text-center rounded-md bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                >
                  Sign Up
                </Link>
                <button className="w-full mt-3 px-4 py-2 flex justify-center items-center rounded-md hover:bg-gray-800 text-gray-300 transition-colors duration-200">
                  <PiSignOutBold size={18} className="mr-2" /> Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
