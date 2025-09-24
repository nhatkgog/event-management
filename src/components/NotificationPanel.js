export default function NotificationPanel({ notifications = [] }) {
  const defaultNotifications = [
    {
      id: 1,
      type: "hackathon",
      title: "Hackathon 2025",
      message: "156 students notified - 2 hours ago",
      color: "bg-blue-500",
    },
    {
      id: 2,
      type: "networking",
      title: "Networking Night",
      message: "89 signups - 4 hours ago",
      color: "bg-green-500",
    },
    {
      id: 3,
      type: "conference",
      title: "Conference Reminder",
      message: "Tomorrow 2 PM - Room B204",
      color: "bg-orange-500",
    },
  ]

  const displayNotifications = notifications.length > 0 ? notifications : defaultNotifications

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">THÔNG BÁO HIỆN TẠI</h3>
      <div className="space-y-4">
        {displayNotifications.map((notification) => (
          <div key={notification.id} className="flex items-center gap-4">
            <div className={`w-12 h-12 ${notification.color} rounded-full flex items-center justify-center`}>
              <span className="text-white font-bold text-sm">
                {notification.type === "hackathon" && "H"}
                {notification.type === "networking" && "N"}
                {notification.type === "conference" && "C"}
              </span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">{notification.title}</h4>
              <p className="text-gray-600 text-sm">{notification.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
