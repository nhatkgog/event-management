"use client";

import Image from "next/image";
import Card from "./Card";
import { formatDate, formatTime } from "../lib/utils.js";

const categoryColors = {
  TECH: "bg-blue-500",
  SPORT: "bg-green-500",
  ART: "bg-purple-500",
  ACADEMIC: "bg-orange-500",
};

export default function AttendanceCard({ event, registration }) {
  const categoryColor = categoryColors[event.categoryId?.name] || "bg-gray-500";

  // 🟡 Xác định trạng thái tham gia
  let statusText = "Chưa Check In";
  let statusColor = "bg-gray-400";

  if (registration?.isCheckedIn && !registration?.isCheckedOut) {
    statusText = "Đã Check In";
    statusColor = "bg-green-500";
  } else if (registration?.isCheckedOut) {
    statusText = "Đã Check Out";
    statusColor = "bg-red-500";
  }

  return (
    <div>
      <Card className="group hover:shadow-lg transition-all duration-300 flex flex-col">
        {/* Ảnh sự kiện */}
        <div className="relative h-48 overflow-hidden rounded-t-xl">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span
              className={`${categoryColor} text-white px-3 py-1 rounded-full text-sm font-medium`}
            >
              {event.categoryId?.name}
            </span>
          </div>
        </div>

        {/* Nội dung sự kiện */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
            <span>{formatDate(event.date)}</span>
            <span>{formatTime(event.time)}</span>
          </div>

          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-red-500 transition-colors">
            {event.title}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {event.description}
          </p>

          <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
            <span>
              {event.participants}/{event.maxParticipants} người tham gia
            </span>
            <span>{event.organizer}</span>
          </div>

          {/* Trạng thái Check In / Check Out */}
          <div className="mt-auto">
            <div
              className={`text-white text-center py-2 rounded-lg font-semibold ${statusColor}`}
            >
              {statusText}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
