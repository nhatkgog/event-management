// components/dashboard/StatGrid.jsx
const stats = [
  { icon: "📅", value: "24", label: "Sự kiện tháng này", color: "bg-purple-500" },
  { icon: "👥", value: "1,247", label: "Sinh viên tham gia", color: "bg-red-500" },
  { icon: "✅", value: "89%", label: "Tỉ lệ điểm danh", color: "bg-green-500" },
  { icon: "🔔", value: "156", label: "Thông báo đã gửi", color: "bg-orange-500" },
]

export default function StatGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
      {stats.map((s, i) => (
        <div
          key={i}
          className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3 border border-gray-100 hover:shadow-md transition"
        >
          <div className={`${s.color} text-white w-10 h-10 flex items-center justify-center rounded-lg text-lg`}>
            {s.icon}
          </div>
          <div>
            <div className="text-xl font-bold">{s.value}</div>
            <div className="text-gray-500 text-sm">{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
