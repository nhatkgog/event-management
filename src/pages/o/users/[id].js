"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { 
  ArrowLeft, 
  Calendar, 
  CheckCircle, 
  LogIn, 
  LogOut, 
  XCircle, 
  User 
} from "lucide-react"
import Card from "@/components/Card"

// 🧪 Mock API để test
const mockUser = {
  _id: "1",
  studentCode: "SV001",
  fullName: "Nguyễn Văn A",
  email: "a@example.com",
  role: { name: "Admin" },
  avatarUrl: "https://i.pravatar.cc/150?img=3",
  clubs: [
    { _id: "c1", name: "CLB Lập Trình" },
    { _id: "c2", name: "CLB Tiếng Anh" },
  ],
}

const mockRegistrations = [
  {
    _id: "r1",
    event: { _id: "1", title: "Hội thảo AI 2025" },
    attendedAt: "2025-09-10T08:00:00Z",
    isCheckedIn: true,
    isCheckedOut: true,
  },
  {
    _id: "r2",
    event: { _id: "2", title: "Hackathon Sinh viên" },
    attendedAt: null,
    isCheckedIn: false,
    isCheckedOut: false,
  },
]

export default function UserDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const [user, setUser] = useState(null)
  const [registrations, setRegistrations] = useState([])

  useEffect(() => {
    // ✅ Fetch từ API thật ở đây
    setUser(mockUser)
    setRegistrations(mockRegistrations)
  }, [id])

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-10 text-center text-gray-500">
        Đang tải dữ liệu người dùng...
      </div>
    )
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 max-w-6xl space-y-8">
        {/* Back button */}
        <div>
          <Link
            href="/o/users"
            className="inline-flex items-center text-red-500 hover:text-red-600 font-medium mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Quay lại danh sách
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 🧍 Cột trái: Thông tin người dùng */}
          <div className="lg:col-span-1">
            <Card className="p-6 flex flex-col items-center text-center space-y-4">
              {/* Avatar */}
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-red-500 shadow-md">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                    <User className="w-12 h-12" />
                  </div>
                )}
              </div>

              {/* Tên */}
              <h2 className="text-xl font-bold">{user.fullName}</h2>

              {/* Vai trò */}
              <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-semibold">
                {user.role?.name}
              </span>

              {/* Thông tin khác */}
              <div className="text-left w-full space-y-2 mt-4 text-gray-700">
                <p><strong>MSSV:</strong> {user.studentCode || "—"}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <div>
                  <p className="font-semibold">Câu lạc bộ:</p>
                  {user.clubs && user.clubs.length > 0 ? (
                    <ul className="list-disc list-inside ml-1 text-gray-600">
                      {user.clubs.map((club) => (
                        <li key={club._id}>{club.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">Chưa tham gia CLB nào</p>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* 📅 Cột phải: Sự kiện đã đăng ký */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-red-500" /> Sự kiện đã đăng ký
              </h2>

              {registrations.length === 0 ? (
                <p className="text-gray-500 italic">Chưa có sự kiện nào</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                      <tr>
                        <th className="px-4 py-3 text-left">Tên sự kiện</th>
                        <th className="px-4 py-3 text-left">Ngày tham dự</th>
                        <th className="px-4 py-3 text-center">Check-in</th>
                        <th className="px-4 py-3 text-center">Check-out</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.map((reg) => (
                        <tr
                          key={reg._id}
                          className="border-t hover:bg-gray-50 transition"
                        >
                          <td className="px-4 py-3">
                            <Link
                              href={`/o/events/${reg.event._id}`}
                              className="text-blue-500 hover:text-blue-600 font-medium"
                            >
                              {reg.event.title}
                            </Link>
                          </td>
                          <td className="px-4 py-3">
                            {reg.attendedAt
                              ? new Date(reg.attendedAt).toLocaleString("vi-VN")
                              : "—"}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {reg.isCheckedIn ? (
                              <CheckCircle className="w-5 h-5 text-green-500 inline" />
                            ) : (
                              <XCircle className="w-5 h-5 text-gray-400 inline" />
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {reg.isCheckedOut ? (
                              <CheckCircle className="w-5 h-5 text-green-500 inline" />
                            ) : (
                              <XCircle className="w-5 h-5 text-gray-400 inline" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
