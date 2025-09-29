// components/dashboard/QuickActions.jsx
export default function QuickActions() {
  const actions = [
    { icon: "➕", label: "Tạo sự kiện" },
    { icon: "📢", label: "Gửi thông báo" },
    { icon: "📊", label: "Thống kê" },
  ]

  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((a, i) => (
        <button
          key={i}
          className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-5 py-3 rounded-full flex items-center gap-2 transition"
        >
          <span>{a.icon}</span>
          {a.label}
        </button>
      ))}
    </div>
  )
}
