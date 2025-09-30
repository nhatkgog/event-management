"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Bell, Clock } from "lucide-react";
import GlobalSearch from "../GlobalSearch";
import { usePathname } from "next/navigation";
// ✅ Mẫu dữ liệu thông báo
const sampleNotifications = [
  {
    _id: "1",
    sender: { fullName: "CLB Tin học" },
    event: { _id: "1", title: "Workshop AI" },
    title: "Workshop AI",
    content: "Tham gia Workshop AI để khám phá công nghệ mới!",
    sentAt: "2025-09-30T10:00:00Z",
    metadata: "<p>Nội dung mail Workshop AI</p>",
  },
  {
    _id: "2",
    sender: { fullName: "CLB Tiếng Anh" },
    event: { _id: "2", title: "Cuộc thi Hùng biện" },
    title: "Cuộc thi Hùng biện",
    content: "Hãy chuẩn bị cho cuộc thi hùng biện sắp tới nhé!",
    sentAt: "2025-09-29T14:30:00Z",
    metadata: "<p>Mail từ CLB Tiếng Anh</p>",
  },
  {
    _id: "3",
    sender: { fullName: "CLB Lập trình" },
    event: { _id: "3", title: "Hackathon 2025" },
    title: "Hackathon 2025",
    content: "Tham gia cuộc thi Hackathon để thử thách bản thân!",
    sentAt: "2025-09-25T09:00:00Z",
    metadata: "<p>Thông tin Hackathon 2025</p>",
  },
  {
    _id: "4",
    sender: { fullName: "Ban tổ chức" },
    event: { _id: "4", title: "Giải chạy sinh viên" },
    title: "Giải chạy sinh viên",
    content: "Giải chạy sinh viên sẽ diễn ra vào cuối tuần này!",
    sentAt: "2025-09-24T11:00:00Z",
    metadata: "<p>Mail xác nhận giải chạy sinh viên</p>",
  },
  {
    _id: "5",
    sender: { fullName: "Đoàn trường" },
    event: { _id: "5", title: "Chào tân sinh viên" },
    title: "Chào tân sinh viên",
    content: "Sự kiện chào tân sinh viên sẽ diễn ra vào tuần tới.",
    sentAt: "2025-09-20T15:45:00Z",
    metadata: "<p>Mail mời tham gia Chào tân sinh viên</p>",
  },
  {
    _id: "6",
    sender: { fullName: "CLB AI" },
    event: { _id: "6", title: "Buổi giới thiệu AI" },
    title: "Mời tham gia buổi giới thiệu",
    content: "Buổi giới thiệu AI dành cho các thành viên mới.",
    sentAt: "2025-09-18T10:00:00Z",
    metadata: "<p>Mail từ CLB AI</p>",
  },
  {
    _id: "7",
    sender: { fullName: "Phòng đào tạo" },
    event: { _id: "7", title: "Lịch học học kỳ I" },
    title: "Thông báo lịch học",
    content: "Lịch học học kỳ I đã được công bố.",
    sentAt: "2025-09-15T08:30:00Z",
    metadata: "<p>Mail từ phòng đào tạo</p>",
  },
  {
    _id: "8",
    sender: { fullName: "CLB Bóng đá" },
    event: { _id: "8", title: "Giải bóng đá sinh viên" },
    title: "Giải bóng đá sinh viên",
    content: "Giải bóng đá sinh viên sẽ bắt đầu vào tuần sau.",
    sentAt: "2025-09-10T09:15:00Z",
    metadata: "<p>Mail mời tham gia giải bóng đá</p>",
  },
];

// 🕓 Hàm tính khoảng thời gian gửi
function timeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diff = Math.floor((now - past) / 1000);

  if (diff < 60) return `${diff} giây trước`;
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} ngày trước`;

  return past.toLocaleDateString("vi-VN");
}

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const dropdownRef = useRef(null);
  const pathname = usePathname();

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notificationsToShow = sampleNotifications.slice(0, visibleCount);

  return (
    <header className="bg-gradient-to-r from-orange-400 to-red-500 text-white shadow relative">
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
            {[
              { label: "Trang chủ", href: "/" },
              { label: "Câu lạc bộ", href: "/clubs" },
              { label: "Sự kiện", href: "/events" },
              { label: "Điểm danh", href: "/attendance" },
            ].map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition relative ${
                    isActive
                      ? "text-yellow-200 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-yellow-200"
                      : "hover:text-yellow-200"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Search and User */}
          <div
            className="flex items-center space-x-4 relative"
            ref={dropdownRef}
          >
            <GlobalSearch />

            <SignedOut>
              <SignInButton>
                <button className="bg-white text-orange-500 px-4 py-1 rounded-full font-semibold hover:bg-orange-100 transition">
                  Login
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              {/* 🔔 Bell + Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="p-2 hover:bg-orange-50 hover:text-orange-600 rounded-full transition relative"
                >
                  <Bell className="w-6 h-6" />
                  <span className="absolute top-1 right-1 bg-red-600 text-white text-xs rounded-full px-1">
                    {sampleNotifications.length}
                  </span>
                </button>

                {showDropdown && (
                  <div className=" absolute right-0 mt-2 w-80 bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden z-50">
                    <div className="p-3 border-b">
                      <h3 className="font-bold text-xl">Thông báo</h3>
                    </div>
                    <div className="px-3">
                      <div className="max-h-96 overflow-y-auto divide-y">
                        {notificationsToShow.map((n) => (
                          <Link
                            key={n.id}
                            href={`/events/${n.event._id}`}
                            className="p-3 hover:bg-gray-50 cursor-pointer"
                          >
                            <p className="font-medium">{n.sender.fullName}</p>
                            <p className="text-sm text-gray-600">{n.title}</p>
                            <div className="flex items-center text-xs text-gray-400 mt-1">
                              <Clock className="w-3 h-3 mr-1" />
                              {timeAgo(n.sentAt)}
                            </div>
                          </Link>
                        ))}

                        {visibleCount < sampleNotifications.length && (
                          <button
                            onClick={() => setVisibleCount(visibleCount + 5)}
                            className="w-full text-center py-2 text-blue-600 hover:bg-gray-100 text-sm font-medium"
                          >
                            Xem thông báo trước đó
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

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
