// pages/admin/dashboard.jsx
"use client"

import { SignedIn, SignedOut } from "@clerk/nextjs"
import StatGrid from "@/components/Admin/StatGrid"
import NotificationPanel from "@/components/NotificationPanel"
import UpcomingEvents from "@/components/UpcomingEvents"
import QuickActions from "@/components/Admin/QuickActions"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts"

import {getAuth} from "@clerk/nextjs/server";
import {fetchWithInternalAccess} from "@/utils/internalAccess";
import AdminLayout from "@/components/AdminLayout";
import Layout from "@/components/layout/Layout";

export async function getServerSideProps({ req }) {

    const { userId } = getAuth(req);
    const res = await fetchWithInternalAccess(`/api/clerk?userId=${userId}`);
    const role = res.private_metadata?.role ?? null;

    return { props: { role } };
}

export default function AdminDashboard({role}) {
    const SelectedLayout = role === "admin" ? AdminLayout : Layout;
  const [stats, setStats] = useState(null)
  const [monthlyData, setMonthlyData] = useState([])

  // 🧪 Dữ liệu mẫu cho dashboard
  useEffect(() => {
    const sampleStats = {
      totalClubs: 12,
      totalEvents: 58,
      totalMembers: 1423,
      participationRate: 87,
    }

    const sampleMonthlyData = [
      { month: "Jan", events: 4, participants: 120 },
      { month: "Feb", events: 6, participants: 200 },
      { month: "Mar", events: 8, participants: 340 },
      { month: "Apr", events: 7, participants: 280 },
      { month: "May", events: 10, participants: 420 },
      { month: "Jun", events: 5, participants: 150 },
    ]

    setStats(sampleStats)
    setMonthlyData(sampleMonthlyData)
  }, [])

  return (
      <SelectedLayout title="Admin Dashboard - UniVibe">
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
            {/* Cột trái */}
            <div className="lg:col-span-1 space-y-6">
              <NotificationPanel />
              <UpcomingEvents />
            </div>

            {/* Cột phải: nội dung quản trị chính */}
            <div className="lg:col-span-2">
              {stats ? (
                <div className="space-y-8">
                  {/* Biểu đồ thống kê */}
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">📅 Số sự kiện theo tháng</h2>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="events" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>

                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">👥 Người tham gia theo tháng</h2>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="participants" stroke="#10b981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </Card>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full flex items-center justify-center text-gray-400">
                  Đang tải thống kê...
                </div>
              )}
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
       </SelectedLayout>
  )
}

// AdminDashboard.getLayout = function getLayout(page) {
//   const AdminLayout = require('@/components/AdminLayout').default;
//   return <AdminLayout>{page}</AdminLayout>;
// };
