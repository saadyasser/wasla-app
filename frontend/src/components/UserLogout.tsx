"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UserLogoutProps {
  name: string;
  email?: string;
}

export const UserLogout = ({ name, email }: UserLogoutProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/auth");
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex-shrink-0 w-10 h-10 rounded-full bg-[#006633] flex items-center justify-center text-white text-sm font-bold hover:bg-[#005522] transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)}
      </button>

      {isOpen && (
        <div className="absolute right-[50%] translate-x-1/2 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
          <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
            <p className="font-medium">{name}</p>
            {email && <p className="text-gray-500 text-xs truncate">{email}</p>}
          </div>
          <button
            onClick={handleSignOut}
            className="cursor-pointer block w-full text-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};
