"use client"

import Link from "next/link"
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import GlobalSearch from "../GlobalSearch"

export default function Header() {
  // const { user, logout, isAuthenticated } = useAuth()

  return (
    <header className="bg-red-500 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-red-500 font-bold text-xl">U</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/events" className="hover:text-red-200 transition-colors">
              Sự kiện
            </Link>
            <Link href="/clubs" className="hover:text-red-200 transition-colors">
              Điểm danh
            </Link>
              <SignedOut>
                  <SignInButton />
                  {/*<SignUpButton />*/}
              </SignedOut>
            {/*{isAuthenticated && user?.role === "admin" && (*/}
            {/*  <>*/}
            {/*    <Link href="/admin" className="hover:text-red-200 transition-colors">*/}
            {/*      Thông kê*/}
            {/*    </Link>*/}
            {/*    <Link href="/admin" className="hover:text-red-200 transition-colors">*/}
            {/*      Quản lí*/}
            {/*    </Link>*/}
            {/*  </>*/}
            {/*)}*/}
          </nav>

          {/* Search and User */}
          <div className="flex items-center space-x-4">
            <GlobalSearch />

            {/*{isAuthenticated ? (*/}
            {/*  <div className="relative group">*/}
            {/*    <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center">*/}
            {/*      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">*/}
            {/*        <path*/}
            {/*          strokeLinecap="round"*/}
            {/*          strokeLinejoin="round"*/}
            {/*          strokeWidth={2}*/}
            {/*          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"*/}
            {/*        />*/}
            {/*      </svg>*/}
            {/*    </button>*/}
            {/*    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">*/}
            {/*      <div className="px-4 py-2 text-sm text-gray-700 border-b">{user?.email}</div>*/}
            {/*      <button*/}
            {/*        onClick={logout}*/}
            {/*        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"*/}
            {/*      >*/}
            {/*        Đăng xuất*/}
            {/*      </button>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*) : (*/}
            {/*   <Link href="/login" className="w-8 h-8 bg-white rounded-full flex items-center justify-center">*/}
            {/*     <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">*/}
            {/*       <path*/}
            {/*         strokeLinecap="round"*/}
            {/*         strokeLinejoin="round"*/}
            {/*         strokeWidth={2}*/}
            {/*         d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"*/}
            {/*       />*/}
            {/*     </svg>*/}
            {/*   </Link>*/}
                <SignedIn>
                <UserButton />
                </SignedIn>
          </div>
        </div>
      </div>
    </header>
  )
}
