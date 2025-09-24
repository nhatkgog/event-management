"use client"

import Head from "next/head"
import Link from "next/link"
import { useAuth } from "../contexts/AuthContext"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function AdminLayout({ children, title = "Admin - UniVibe" }) {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      router.push("/login")
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== "admin") {
    return null
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Admin Panel - UniVibe" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-red-500 text-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/admin" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-red-500 font-bold text-xl">U</span>
                </div>
              </Link>

              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/events" className="hover:text-red-200 transition-colors">
                  Sự kiện
                </Link>
                <Link href="/clubs" className="hover:text-red-200 transition-colors">
                  Điểm danh
                </Link>
                <Link href="/admin" className="hover:text-red-200 transition-colors">
                  Thông kê
                </Link>
                <Link href="/admin" className="hover:text-red-200 transition-colors">
                  Quản lí
                </Link>
              </nav>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm sự kiện"
                    className="bg-white text-gray-900 px-4 py-2 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-red-300"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>

                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main>{children}</main>
      </div>
    </>
  )
}
