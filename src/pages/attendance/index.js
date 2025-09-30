"use client";

import { useState, useMemo, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import AttendanceCard from "../../components/AttendanceCard";
import EventFilters from "../../components/EventFilters";
import Layout from "../../components/layout/Layout";
import AdminLayout from "@/components/AdminLayout";
import { events, registrations as initialRegs } from "../../lib/data"; // ✅ data mẫu

export default function Index({ role }) {
  const SelectedLayout = role === "admin" ? AdminLayout : Layout;
  const { userId } = useAuth(); 

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // 🟡 Quản lý registrations trong state để cập nhật động
  const [userRegistrations, setUserRegistrations] = useState([]);
  const [userEvents, setUserEvents] = useState([]);

  // 🟡 Khi user login → lọc registration
  useEffect(() => {
    if (!userId) return;

    const regs = initialRegs.filter((reg) => reg.userId === userId);
    setUserRegistrations(regs);

    const userEventIds = regs.map((reg) => reg.eventId);
    const matchedEvents = events.filter((ev) => userEventIds.includes(ev.id));
    setUserEvents(matchedEvents);
  }, [userId]);

  // ✅ Xử lý Check-in
  const handleCheckIn = (eventId) => {
    setUserRegistrations((prev) =>
      prev.map((reg) =>
        reg.eventId === eventId
          ? { ...reg, isCheckedIn: true, status: "Attended", attendedAt: new Date().toISOString() }
          : reg
      )
    );
  };

  // ✅ Xử lý Check-out
    const handleCheckOut = (eventId) => {
    setUserRegistrations((prev) =>
      prev.map((reg) =>
        reg.eventId === eventId
          ? { ...reg, isCheckedOut: true }
          : reg
      )
    );
  };

  // 🟢 Lọc thêm theo danh mục & tìm kiếm
  const filteredEvents = useMemo(() => {
    let filtered = [...userEvents];

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (ev) => ev.categoryId?.name === selectedCategory
      );
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (ev) =>
          ev.title.toLowerCase().includes(q) ||
          ev.description.toLowerCase().includes(q) ||
          (ev.organizer || "").toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery, userEvents]);

  return (
    <SelectedLayout title="Sự kiện sinh viên - UniVibe">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-500 to-orange-400 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
            Khám Phá Các Sự Kiện Sinh Viên
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Tham gia hoạt động thú vị, kết nối bạn bè & phát triển kỹ năng cùng
            các câu lạc bộ sinh viên!
          </p>
        </div>
      </section>

      {/* Bộ lọc + Sự kiện */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-6">
          <EventFilters
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <p className="text-gray-600 text-sm mb-6">
            Có{" "}
            <span className="font-semibold text-red-500">
              {filteredEvents.length}
            </span>{" "}
            sự kiện bạn đã đăng ký
          </p>

          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => {
                const reg = userRegistrations.find(r => r.eventId === event.id);
                return (
                  <AttendanceCard 
                    key={event.id} 
                    event={event} 
                    registration={reg}
                    onCheckIn={() => handleCheckIn(event.id)}
                    onCheckOut={() => handleCheckOut(event.id)}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2.306"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Bạn chưa có sự kiện nào
              </h3>
              <p className="text-gray-500">
                Hãy thử đăng ký một vài sự kiện để theo dõi tại đây.
              </p>
            </div>
          )}
        </div>
      </section>
    </SelectedLayout>
  );
}
