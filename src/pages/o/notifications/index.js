"use client"

import { useState, useMemo } from "react"
import { Mail, Info, X, Clock, User, Calendar, Search, ArrowDownAZ, ArrowUpAZ } from "lucide-react"
import { format } from "date-fns"

export default function NotificationsList() {
  // 📝 Data mẫu
  const sampleNotifications = [
    {
      _id: "1",
      sender: { fullName: "Nguyễn Văn A" },
      event: { title: "Sự kiện Chào tân sinh viên" },
      title: "Thông báo tham gia sự kiện",
      content: "Bạn được mời tham gia sự kiện Chào tân sinh viên vào tuần tới.",
      sentAt: "2025-09-30T10:00:00Z",
      metadata: "<h3>Mail từ CLB</h3><p>Chào bạn, vui lòng xác nhận tham gia nhé!</p>",
    },
    {
      _id: "2",
      sender: { fullName: "CLB Tin học" },
      event: { title: "Workshop AI" },
      title: "Mời tham gia Workshop AI",
      content: "Tham gia workshop AI để khám phá công nghệ mới!",
      sentAt: "2025-09-29T14:30:00Z",
      metadata: "<p><b>Mail Workshop:</b><br>CLB Tin học mời bạn tham dự Workshop AI!</p>",
    },
    {
      _id: "3",
      sender: { fullName: "CLB Tiếng Anh" },
      event: { title: "Cuộc thi Hùng biện" },
      title: "Thư mời cuộc thi hùng biện",
      content: "Bạn đã đăng ký cuộc thi hùng biện? Hãy kiểm tra thông tin!",
      sentAt: "2025-09-25T09:00:00Z",
      metadata: "<p><i>Gửi từ CLB Tiếng Anh</i></p>",
    },
    {
      _id: "4",
      sender: { fullName: "Ban Tổ Chức" },
      event: { title: "Giải chạy sinh viên" },
      title: "Xác nhận tham gia giải chạy",
      content: "Vui lòng xác nhận sự tham gia của bạn trong vòng 24h.",
      sentAt: "2025-09-28T08:15:00Z",
      metadata: "<p>Mail xác nhận đăng ký giải chạy sinh viên 🏃</p>",
    },
    {
      _id: "5",
      sender: { fullName: "CLB Lập trình" },
      event: { title: "Hackathon 2025" },
      title: "Thư mời tham gia Hackathon",
      content: "Tham gia cuộc thi Hackathon để thử thách bản thân!",
      sentAt: "2025-09-20T08:15:00Z",
      metadata: "<p>Hackathon 2025 - Cơ hội lớn cho lập trình viên!</p>",
    },
  ]

  const [selected, setSelected] = useState(null)
  const [mailContent, setMailContent] = useState(null)
  const [search, setSearch] = useState("")
  const [sortOrder, setSortOrder] = useState("desc") // "asc" hoặc "desc"
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 4

  // ✅ Lọc & sắp xếp danh sách
  const filteredAndSorted = useMemo(() => {
    let result = sampleNotifications

    // Lọc theo tiêu đề
    if (search.trim() !== "") {
      result = result.filter((n) =>
        n.title.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Sắp xếp theo thời gian
    result = [...result].sort((a, b) => {
      const tA = new Date(a.sentAt).getTime()
      const tB = new Date(b.sentAt).getTime()
      return sortOrder === "asc" ? tA - tB : tB - tA
    })

    return result
  }, [sampleNotifications, search, sortOrder])

  // ✅ Phân trang
  const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = filteredAndSorted.slice(startIndex, startIndex + itemsPerPage)

  // ✅ Click ngoài popup để đóng
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setSelected(null)
      setMailContent(null)
    }
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <h1 className="text-2xl font-bold text-gray-800">📬 Danh sách thông báo</h1>

        <div className="flex items-center gap-2">
          {/* 🔍 Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo tiêu đề..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-8 pr-3 py-1.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            />
          </div>

          {/* 🕒 Sort */}
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-200 transition"
          >
            {sortOrder === "asc" ? <ArrowUpAZ className="w-4 h-4" /> : <ArrowDownAZ className="w-4 h-4" />}
            {sortOrder === "asc" ? "Tăng dần" : "Giảm dần"}
          </button>
        </div>
      </div>

      {/* 🟦 Grid danh sách */}
      {currentItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {currentItems.map((n) => (
            <div
              key={n._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 border border-gray-100 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <h2 className="text-base font-semibold text-gray-800 line-clamp-2">{n.title}</h2>

                <div className="flex items-center text-sm text-gray-500 gap-1">
                  <User className="w-4 h-4" />
                  <span>{n.sender?.fullName}</span>
                </div>

                <div className="flex items-center text-sm text-gray-500 gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{n.event?.title}</span>
                </div>

                <div className="flex items-center text-sm text-gray-400 gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{format(new Date(n.sentAt), "dd/MM/yyyy HH:mm")}</span>
                </div>

                <p className="text-sm text-gray-600 line-clamp-3 mt-2">{n.content}</p>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setSelected(n)}
                  className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition font-medium text-sm"
                >
                  <Info className="w-4 h-4" />
                  Chi tiết
                </button>

                <button
                  onClick={() => setMailContent(n.metadata)}
                  className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition font-medium text-sm"
                >
                  <Mail className="w-4 h-4" />
                  Mail
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-10">Không có thông báo nào phù hợp.</p>
      )}

      {/* 📄 Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            ⬅ Trước
          </button>

          <span className="text-sm">
            Trang <b>{currentPage}</b> / {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Sau ➡
          </button>
        </div>
      )}

      {/* 📌 Popup Chi tiết */}
      {selected && (
        <div
          className="fixed inset-0 bg-gray-200/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
          onClick={handleOverlayClick}
        >
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg relative shadow-2xl">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setSelected(null)}
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">📄 Chi tiết thông báo</h2>

            <div className="space-y-3 text-gray-700 text-sm">
              <p><strong>👤 Người gửi:</strong> {selected.sender?.fullName}</p>
              <p><strong>📌 Sự kiện:</strong> {selected.event?.title}</p>
              <p><strong>📝 Tiêu đề:</strong> {selected.title}</p>
              <p><strong>💬 Nội dung:</strong> {selected.content}</p>
              <p><strong>⏰ Gửi lúc:</strong> {format(new Date(selected.sentAt), "dd/MM/yyyy HH:mm")}</p>
            </div>
          </div>
        </div>
      )}

      {/* 📧 Popup Mail */}
      {mailContent && (
        <div
          className="fixed inset-0 bg-gray-200/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
          onClick={handleOverlayClick}
        >
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl relative shadow-2xl max-h-[80vh] overflow-auto">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setMailContent(null)}
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">📩 Nội dung Gmail</h2>

            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: mailContent }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
