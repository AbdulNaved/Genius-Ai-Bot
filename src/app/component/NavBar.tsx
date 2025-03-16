import React, { useState, useEffect, useRef } from "react";
import {
  Bars3Icon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  UserPlusIcon,
  SunIcon,
  MoonIcon,
  BoltIcon, // ✅ Added
} from "@heroicons/react/24/solid"; // Use solid variant
import Avatar from "react-avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

type NavBarProps = {
  setAsideOpen: (isOpen: boolean) => void;
};

const NavBar = ({ setAsideOpen }: NavBarProps) => {
  const [isAsideOpen, setAsideOpenState] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleAside = () => {
    const newState = !isAsideOpen;
    setAsideOpenState(newState);
    setAsideOpen(newState);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

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
    <nav className="text-white dark:text-white sticky top-0 left-0 right-0 z-50 shadow-lg flex justify-between items-center h-16 px-4 md:px-6 bg-customDark dark:bg-gray-900 border-b border-gray-800 backdrop-blur-sm bg-opacity-90">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleAside}
          className="text-white hover:bg-gray-700 hover:text-blue-400 transition-all duration-300 ease-in-out"
        >
          <Bars3Icon className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        <div className="flex items-center gap-2">
          <BoltIcon className="h-6 w-6 text-blue-500 animate-pulse" /> {/* ✅ Changed */}
          <h1 className="text-xl font-bold hidden sm:block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Genius AI
          </h1>
        </div>
      </div>

      {/* Right side dropdown and theme toggle */}
      {/* ...rest of your code remains same */}
    </nav>
  );
};

export default NavBar;
