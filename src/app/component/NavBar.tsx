import React, { useState, useEffect, useRef } from "react";
import {
  Bars3Icon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  UserPlusIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { BrainIcon } from "@heroicons/react/24/solid";
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

  // After mounting, we can safely show the theme toggle
  useEffect(() => setMounted(true), []);

  const toggleAside = () => {
    const newState = !isAsideOpen;
    setAsideOpenState(newState);
    setAsideOpen(newState); // Update parent state
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
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
          <BrainIcon className="h-6 w-6 text-blue-500 animate-pulse" />
          <h1 className="text-xl font-bold hidden sm:block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Genius AI
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full h-10 w-10 text-gray-300 hover:text-blue-400 hover:bg-gray-800 transition-all duration-300"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
            <span className="sr-only">
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </span>
          </Button>
        )}

        <div className="relative" ref={dropdownRef}>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDropdown}
            className="rounded-full p-0 h-10 w-10 overflow-hidden border-2 border-gray-700 hover:border-blue-500 transition-all duration-300 ease-in-out"
          >
            <Avatar
              size="40"
              className="rounded-full"
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=genius"
            />
            <span className="sr-only">Open user menu</span>
          </Button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-gray-900/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-xl z-10 border border-gray-800 animate-in fade-in-50 slide-in-from-top-5 duration-300">
              <div className="flex justify-center items-center mt-4 py-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 opacity-20 rounded-full blur-md"></div>
                  <Avatar
                    size="80"
                    className="rounded-full border-2 border-blue-500 relative z-10"
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=genius"
                  />
                </div>
              </div>

              <div className="py-3 px-4">
                <p className="flex justify-center text-xl font-medium mb-4 text-white dark:text-white">
                  Hello <span className="animate-bounce mx-1">🙌</span>
                </p>

                <div className="space-y-2">
                  <Link href="/login" className="w-full">
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-gray-800 dark:bg-gray-800 border-gray-700 hover:bg-gray-700 hover:text-blue-400 text-white transition-all duration-300"
                    >
                      <ArrowLeftOnRectangleIcon className="mr-2 h-4 w-4" />{" "}
                      Login
                    </Button>
                  </Link>

                  <Link href="/signup" className="w-full">
                    <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300">
                      <UserPlusIcon className="mr-2 h-4 w-4" /> Sign Up
                    </Button>
                  </Link>

                  <Button
                    variant="ghost"
                    className="w-full justify-start mt-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300"
                  >
                    <ArrowRightOnRectangleIcon className="mr-2 h-4 w-4" /> Sign
                    Out
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
