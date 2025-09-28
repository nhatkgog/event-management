"use client";

import Link from "next/link"
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Bell } from "lucide-react";
import GlobalSearch from "../GlobalSearch";

export default function Header() {
  // const { user, logout, isAuthenticated } = useAuth()

  return (
    <header className="bg-gradient-to-r from-orange-400 to-red-500 text-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-10 h-10 rounded-full bg-white p-1"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8 font-medium">
            <Link href="/" className="hover:text-yellow-200 transition">
              Trang chủ
            </Link>
            <Link href="/clubs" className="hover:text-yellow-200 transition">
              Câu lạc bộ
            </Link>
            <Link href="/events" className="hover:text-yellow-200 transition">
              Sự kiện
            </Link>
            <Link
              href="/attendance"
              className="hover:text-yellow-200 transition"
            >
              Điểm danh
            </Link>
          </nav>

          {/* Search and User */}
          <div className="flex items-center space-x-4">
            <GlobalSearch />

            <SignedOut>
              <SignInButton>
                <button className="bg-white text-orange-500 px-4 py-1 rounded-full font-semibold hover:bg-orange-100 transition">
                  Login
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              {/* Nút thông báo */}
              <button className="p-2 hover:bg-orange-50 hover:text-orange-600 rounded-full transition relative">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 bg-red-600 text-white text-xs rounded-full px-1">
                  3
                </span>
              </button>

              {/* Avatar người dùng */}
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}
