"use client";

import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "../../components/layout/Layout";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { events, schedules } from "../../lib/data";
import { formatDate, formatTime } from "../../lib/utils";

export default function EventDetail() {
  const router = useRouter();
  const { id } = router.query;
  const event = events.find((e) => e.id === Number.parseInt(id));

  const eventSchedules = event
    ? schedules
        .filter((s) => s.eventId === event.id)
        .sort((a, b) => a.order - b.order)
    : [];

  if (!event) {
    return (
      <Layout title="Sự kiện không tồn tại - UniVibe">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-600 mb-4">
            Sự kiện không tồn tại
          </h1>
          <Button onClick={() => router.push("/events")}>
            Quay lại danh sách sự kiện
          </Button>
        </div>
      </Layout>
    );
  }

  const categoryColors = {
    TECH: "bg-blue-500",
    SPORT: "bg-green-500",
    ART: "bg-purple-500",
    ACADEMIC: "bg-orange-500",
  };

  return (
    <>
      {" "}
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 text-white">
            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-4">
                <span
                  className={`${
                    categoryColors[event.category] || "bg-gray-500"
                  } text-white px-4 py-2 rounded-full text-sm font-medium`}
                >
                  {event.category}
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                  {formatDate(event.date)} - {formatTime(event.time)}
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                {event.title}
              </h1>
              <p className="text-xl text-white/90">{event.description}</p>
            </div>
          </div>
        </div>
      </section>
      {/* Event Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">Thông tin chi tiết</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {event.description}
                  </p>
                </div>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">Lịch trình sự kiện</h2>
                <div className="space-y-4">
                  {eventSchedules.length > 0 ? (
                    eventSchedules.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <div>
                          <h3 className="font-semibold">{item.title}</h3>
                          <p className="text-gray-600 text-sm">{item.time}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">
                      Chưa có lịch trình cho sự kiện này.
                    </p>
                  )}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Thông tin sự kiện</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h8m-8 0H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2"
                      />
                    </svg>
                    <div>
                      <p className="font-medium">Ngày giờ</p>
                      <p className="text-gray-600 text-sm">
                        {formatDate(event.date)} - {formatTime(event.time)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div>
                      <p className="font-medium">Địa điểm</p>
                      <p className="text-gray-600 text-sm">{event.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <div>
                      <p className="font-medium">Số lượng tham gia</p>
                      <p className="text-gray-600 text-sm">
                        {event.participants}/{event.maxParticipants} người
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <div>
                      <p className="font-medium">Tổ chức bởi</p>
                      <p className="text-gray-600 text-sm">{event.organizer}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Đăng ký tham gia</h3>
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="font-medium text-green-800">
                        Miễn phí tham gia
                      </span>
                    </div>
                    <p className="text-green-700 text-sm">
                      Sự kiện hoàn toàn miễn phí cho tất cả sinh viên
                    </p>
                  </div>
                  <Button className="w-full" size="lg">
                    Đăng ký ngay
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    Chia sẻ sự kiện
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
