import Image from "next/image"
import Button from "./Button"
import Card from "./Card"
import { formatDate } from "../lib/utils"

const categoryColors = {
  TECH: "bg-blue-500",
  SPORT: "bg-green-500",
  ART: "bg-purple-500",
  ACADEMIC: "bg-orange-500",
}

const statusLabels = {
  upcoming: "Sắp diễn ra",
  registered: "Đã đăng ký",
  completed: "Đã kết thúc",
}

const statusColors = {
  upcoming: "bg-blue-100 text-blue-800",
  registered: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-800",
}

export default function EventCard({ event, showStatus = false }) {
  const categoryColor = categoryColors[event.category] || "bg-gray-500"
  const statusColor = statusColors[event.status] || "bg-gray-100 text-gray-800"

  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`${categoryColor} text-white px-3 py-1 rounded-full text-sm font-medium`}>
            {event.category}
          </span>
          {showStatus && (
            <span className={`${statusColor} px-3 py-1 rounded-full text-sm font-medium`}>
              {statusLabels[event.status]}
            </span>
          )}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">{formatDate(event.date)}</span>
          <span className="text-sm text-gray-500">{event.time}</span>
        </div>
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-red-500 transition-colors">
          {event.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{event.description}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">
            {event.participants}/{event.maxParticipants} người tham gia
          </span>
          <span className="text-sm text-gray-500">{event.organizer}</span>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            Đăng ký
          </Button>
          <Button variant="outline" size="sm">
            Chi tiết
          </Button>
        </div>
      </div>
    </Card>
  )
}
