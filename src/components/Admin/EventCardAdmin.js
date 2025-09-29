import Image from "next/image";
import Link from "next/link";
import Button from "./../Button";
import Card from "./../Card";
import { formatDate } from "../../lib/utils";

const categoryColors = {
  TECH: "bg-blue-500",
  SPORT: "bg-green-500",
  ART: "bg-purple-500",
  ACADEMIC: "bg-orange-500",
};

const statusLabels = {
  upcoming: "Sắp diễn ra",
  registered: "Đã đăng ký",
  completed: "Đã kết thúc",
};

const statusColors = {
  upcoming: "bg-blue-100 text-blue-800",
  registered: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-800",
};

export default function EventCardAdmin({
  event,
  showStatus = false,
  onDelete,
}) {
  const categoryColor = categoryColors[event.category] || "bg-gray-500";
  const statusColor = statusColors[event.status] || "bg-gray-100 text-gray-800";

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span
            className={`${categoryColor} text-white px-3 py-1 rounded-full text-sm font-medium`}
          >
            {event.category}
          </span>
          {showStatus && (
            <span
              className={`${statusColor} px-3 py-1 rounded-full text-sm font-medium`}
            >
              {statusLabels[event.status]}
            </span>
          )}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">
            {formatDate(event.date)}
          </span>
          <span className="text-sm text-gray-500">{event.time}</span>
        </div>

        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-red-500 transition-colors">
          {event.title}
        </h3>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">
            {event.participants}/{event.maxParticipants} người tham gia
          </span>
          <span className="text-sm text-gray-500">{event.organizer}</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex gap-2">
          <Link href={`/o/events/${event.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full hover:opacity-90 transition">
              Chi tiết
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-full hover:opacity-90 transition"
            onClick={() =>
              onDelete &&
              confirm("Bạn có chắc muốn xóa sự kiện này?") &&
              onDelete(event.id)
            }
          >
            Xóa
          </Button>
        </div>
      </div>
    </Card>
  );
}
