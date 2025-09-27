"use client"

import { useState } from "react"
import AdminLayout from "../../components/AdminLayout"
import StatCard from "../../components/StatCard"
import EventForm from "../../components/EventForm"
import NotificationPanel from "../../components/NotificationPanel"
import UpcomingEvents from "../../components/UpcomingEvents"
import Card from "../../components/Card"
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function AdminDashboard() {
  const [events, setEvents] = useState([])

  const handleCreateEvent = (eventData) => {
    const newEvent = {
      id: Date.now(),
      ...eventData,
      participants: 0,
      status: "upcoming",
    }
    setEvents((prev) => [...prev, newEvent])
    alert("Sự kiện đã được tạo thành công!")
  }

  return (
    // <AdminLayout title="Admin Dashboard - UniVibe">
      <div>
      <SignedIn>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-500 to-orange-400 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">QUẢN LÍ SỰ KIỆN</h1>
            <p className="text-xl text-white/90 mb-8">
              Create and manage events for your student community with the help of AI
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Event
              </button>
              <button className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 00-15 0v5h5l-5 5-5-5h5V7a9.5 9.5 0 0119 0v10z"
                  />
                </svg>
                Bulk Notification
              </button>
              <button className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Statistics
              </button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard icon="📅" value="24" label="Sự kiện tháng này" color="bg-purple-500" />
              <StatCard icon="👥" value="1,247" label="Sinh viên tham gia" color="bg-red-500" />
              <StatCard icon="✅" value="89%" label="Điểm danh" color="bg-green-500" />
              <StatCard icon="🔔" value="156" label="Thông báo đã gửi" color="bg-orange-500" />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Event Form */}
              <div className="lg:col-span-2">
                <EventForm onSubmit={handleCreateEvent} />
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <NotificationPanel />
                <UpcomingEvents />
              </div>
            </div>
          </div>
        </section>

        {/* Recent Index */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">LỊCH SỬ SỰ KIỆN ĐÃ TỔ CHỨC</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  id: 1,
                  title: "Workshop kỹ năng mềm",
                  date: "12 online - 15:00 | 17/07/2025",
                  status: "Đã hoàn thành",
                  participants: "25/30 sinh viên",
                  location: "Phòng hội thảo B201",
                  category: "ACADEMIC",
                  color: "bg-orange-100",
                },
                {
                  id: 2,
                  title: "Cuộc thi AI Contest",
                  date: "15 steps - 17:00 | 14/07/2025",
                  status: "Đang ký",
                  participants: "28/30 sinh viên",
                  location: "Lab AI - C301",
                  category: "TECH",
                  color: "bg-blue-100",
                },
                {
                  id: 3,
                  title: "Triển lãm nghệ thuật sinh viên",
                  date: "18 online - 18:00 | 13/07/2025",
                  status: "Xem báo cáo",
                  participants: "156/150 sinh viên",
                  location: "Thư viện trung tâm",
                  category: "ART",
                  color: "bg-purple-100",
                },
              ].map((event) => (
                <Card key={event.id} className={`p-6 ${event.color}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{event.date}</p>
                      <p className="text-gray-600 text-sm mb-2">{event.participants}</p>
                      <p className="text-gray-600 text-sm">{event.location}</p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">{event.status}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600 transition-colors">
                      Xem báo cáo
                    </button>
                  </div>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <button className="border border-red-500 text-red-500 px-8 py-3 rounded-full hover:bg-red-50 transition-colors">
                Xem thêm
              </button>
            </div>
          </div>
        </section>
      </SignedIn>
      <SignedOut>
        <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold">Access Denied</h1>
            <p>You must be signed in to view the admin dashboard.</p>
        </div>
      </SignedOut>
      </div>
    // </AdminLayout>
  )
}
