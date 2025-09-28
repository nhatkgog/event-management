import { useState } from "react"
import { Bell } from "lucide-react"

export default function NotificationDropdown({ notifications = [] }) {
  const [open, setOpen] = useState(false)

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <div className="relative">
      {/* Nút chuông */}
      <button
        className="p-2 hover:bg-orange-50 hover:text-orange-600 rounded-full transition relative"
        onClick={() => setOpen(!open)}
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 bg-red-600 text-white text-xs rounded-full px-1">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown danh sách thông báo */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white text-gray-800 rounded-lg shadow-lg z-50">
          <div className="p-3 font-semibold border-b">Thông báo</div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map(n => (
                <div
                  key={n._id}
                  className={`flex flex-col gap-1 p-3 border-b last:border-0 hover:bg-gray-50 cursor-pointer ${
                    n.isRead ? "bg-white" : "bg-blue-50"
                  }`}
                >
                  <p className="font-medium text-sm">{n.title}</p>
                  <p className="text-xs text-gray-600">{n.content}</p>
                  <span className="text-xs text-gray-400">
                    {new Date(n.createdAt).toLocaleString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="p-4 text-sm text-gray-500">Không có thông báo nào</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
