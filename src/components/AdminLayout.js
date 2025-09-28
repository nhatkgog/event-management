"use client";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { useState } from "react";
import {
  Calendar,
  Users,
  ClipboardCheck,
  BarChart3,
  Shield,
} from "lucide-react"; // icons

export default function AdminLayout({ children, title = "Admin - UniVibe" }) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      href: "/admin",
      label: "Thống kê",
      icon: <BarChart3 className="w-6 h-6" />,
    },
    {
      href: "/admin/events",
      label: "Sự kiện",
      icon: <Calendar className="w-6 h-6" />,
    },
    {
      href: "/admin/clubs",
      label: "Câu lạc bộ",
      icon: <Users className="w-6 h-6" />,
    },
    {
      href: "/admin/attendance",
      label: "Điểm danh",
      icon: <ClipboardCheck className="w-6 h-6" />,
    },
    {
      href: "/admin/users",
      label: "Quản lý người dùng",
      icon: <Shield className="w-6 h-6" />,
    },
  ];

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Admin Panel - UniVibe" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex">
        {/* Sidebar */}
        <aside
          className={`${
            collapsed ? "w-20" : "w-64"
          } bg-gradient-to-b from-orange-500 to-red-600 text-white flex flex-col fixed inset-y-0 transition-all duration-300`}
        >
          {/* Logo */}
          <div
            className="h-16 flex items-center justify-center border-b border-white/20 px-4 cursor-pointer"
            onClick={() => setCollapsed(!collapsed)}
          >
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-12 h-12 rounded-full bg-white p-1"
              />
              {!collapsed && (
                <span className="text-lg font-bold tracking-wide whitespace-nowrap">
                  UniVibe Admin
                </span>
              )}
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const active =
                router.pathname === item.href ||
                (item.href !== "/admin" &&
                  router.pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined} // hiện tooltip khi thu nhỏ
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                    active
                      ? "bg-white text-red-600 font-semibold"
                      : "hover:bg-white/20"
                  }`}
                >
                  {item.icon}
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* User Button */}
          <div className="p-4 border-t border-white/20 flex items-center justify-center">
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
              />
            </SignedIn>
          </div>
        </aside>

        {/* Content */}
        <main
          className={`flex-1 transition-all duration-300 ${
            collapsed ? "ml-20" : "ml-64"
          } p-6 overflow-y-auto`}
        >
          {children}
        </main>
      </div>
    </>
  );
}
