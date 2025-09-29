// pages/admin/dashboard.jsx
"use client"

import { SignedIn, SignedOut } from "@clerk/nextjs"
import StatGrid from "@/components/Admin/StatGrid"
import NotificationPanel from "@/components/NotificationPanel"
import UpcomingEvents from "@/components/UpcomingEvents"
import QuickActions from "@/components/Admin/QuickActions"

export default function AdminDashboard() {
  return (
    <div>
      <SignedIn>
        {/* Hero */}
        <section className="bg-gradient-to-r from-red-500 to-orange-400 text-white py-14">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-3">🎯 Quản lý sự kiện</h1>
            <p className="text-white/90 mb-6 text-lg">
              Tạo và quản lý sự kiện cho cộng đồng sinh viên của bạn dễ dàng
            </p>
            <QuickActions />
          </div>
        </section>

        {/* Stats */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <StatGrid />
          </div>
        </section>

        {/* Main grid */}
        <section className="pb-14">
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <NotificationPanel />
              <UpcomingEvents />
            </div>
            <div className="lg:col-span-2">
              {/* Content for event table / charts / forms... */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full flex items-center justify-center text-gray-400">
                📌 Nội dung quản trị chính (bảng sự kiện, biểu đồ...)
              </div>
            </div>
          </div>
        </section>
      </SignedIn>

      <SignedOut>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">🚫 Access Denied</h1>
          <p>Bạn cần đăng nhập để xem bảng quản trị.</p>
        </div>
      </SignedOut>
    </div>
  )
}

AdminDashboard.getLayout = function getLayout(page) {
  const AdminLayout = require('@/components/AdminLayout').default;
  return <AdminLayout>{page}</AdminLayout>;
};
