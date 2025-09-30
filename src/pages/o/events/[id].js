"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import EventModal from "../../../components/EventModal";
import { events, schedules } from "../../../lib/data";
import { formatDate, formatTime } from "../../../lib/utils";
import QRCodeModal from "../../../components/QRCodeModal";
import RegistrationTable from "../../../components/RegistrationTable";

export default function AdminEventDetail() {
  const router = useRouter();
  const { id } = router.query;

  // Lấy event theo id
  const event = events.find((e) => e.id === Number.parseInt(id));

  // Modal + State
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [qrOpen, setQrOpen] = useState(false);
  const [qrUrl, setQrUrl] = useState("");

  const handleUpdateEvent = async (formData) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/events/${selectedEvent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Cập nhật sự kiện thất bại");

      const updatedEvent = await response.json();

      alert("✅ Cập nhật sự kiện thành công!");
      setOpenModal(false);
      setSelectedEvent(updatedEvent); // cập nhật state với dữ liệu mới
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi cập nhật sự kiện!");
    } finally {
      setLoading(false);
    }
  };

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-600 mb-4">
          Sự kiện không tồn tại
        </h1>
        <Button onClick={() => router.push("/o/events")}>
          Quay lại danh sách
        </Button>
      </div>
    );
  }

  const eventSchedules = schedules
    .filter((s) => s.eventId === event.id)
    .sort((a, b) => a.order - b.order);

  const handleGenerateQr = async (type) => {
    try {
      const response = await fetch(`/api/events/${event.id}/${type}`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Không thể tạo QR code");

      const data = await response.json();
      setQrUrl(data.url); // backend trả về { url: "https://..." }
      setQrOpen(true);
    } catch (err) {
      console.error(err);
      alert("Lỗi khi tạo QR code");
    }
  };
  return (
    <section className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header & Actions */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">{event.title}</h1>
            <p className="text-gray-500">
              {formatDate(event.date)} • {formatTime(event.time)}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedEvent(event); // gán dữ liệu vào state
                setOpenModal(true);
              }}
            >
              📝 Chỉnh sửa
            </Button>
            <Button
              variant="default"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => handleGenerateQr("checkin")}
            >
              ✅ Check-in
            </Button>
            <Button
              variant="default"
              className="bg-red-600 hover:bg-red-700"
              onClick={() => handleGenerateQr("checkout")}
            >
              🚪 Check-out
            </Button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left: Main content */}
          <div className="xl:col-span-2 space-y-6">
            {/* Event Cover */}
            <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-sm">
              <Image
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">
                  {event.category}
                </span>
              </div>
            </div>

            {/* Description */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-3">Mô tả sự kiện</h2>
              <p className="text-gray-700 leading-relaxed">
                {event.description}
              </p>
            </Card>

            {/* Registration List */}
            <RegistrationTable eventId={event.id} />
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Thông tin cơ bản</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>📅 Ngày tổ chức:</span>
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span>⏰ Thời gian:</span>
                  <span>{formatTime(event.time)}</span>
                </div>
                <div className="flex justify-between">
                  <span>📍 Địa điểm:</span>
                  <span>{event.location}</span>
                </div>
                <div className="flex justify-between">
                  <span>👥 Tham gia:</span>
                  <span>
                    {event.participants}/{event.maxParticipants}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>🏢 Tổ chức:</span>
                  <span>{event.organizer}</span>
                </div>
              </div>
            </Card>
            {/* Schedule */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Lịch trình</h2>
              {eventSchedules.length > 0 ? (
                <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                  {eventSchedules.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 p-3 bg-gray-100 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  Chưa có lịch trình cho sự kiện này.
                </p>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Modal Update */}
      <EventModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleUpdateEvent}
        loading={loading}
        initialData={selectedEvent}
      />

      {/* QR Section */}
      <QRCodeModal
        open={qrOpen}
        onClose={() => setQrOpen(false)}
        qrUrl={qrUrl}
      />
    </section>
  );
}

AdminEventDetail.getLayout = function getLayout(page) {
  const AdminLayout = require("@/components/AdminLayout").default;
  return <AdminLayout>{page}</AdminLayout>;
};
