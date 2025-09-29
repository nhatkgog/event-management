"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import ClubModal from "../../../components/ClubModal";
import { clubs } from "../../../lib/data";
import EventGrid from "@/components/EventGrid";
import RegistrationTable from "@/components/RegistrationTable"; 

export default function AdminClubDetail() {
  const router = useRouter();
  const { id } = router.query;

  // Lấy club theo id (giả lập)
  const club = clubs.find((c) => c.id === Number.parseInt(id));

  // State cho modal chỉnh sửa
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);

  if (!club) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-600 mb-4">
          Câu lạc bộ không tồn tại
        </h1>
        <Button onClick={() => router.push("/o/clubs")}>
          Quay lại danh sách
        </Button>
      </div>
    );
  }

  const handleUpdateClub = async (formData) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/clubs/${selectedClub.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Cập nhật CLB thất bại");
      const updatedClub = await response.json();
      alert("✅ Cập nhật CLB thành công!");
      setSelectedClub(updatedClub);
      setOpenModal(false);
    } catch (err) {
      console.error(err);
      alert("Có lỗi khi cập nhật!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header & Actions */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">{club.name}</h1>
            <p className="text-gray-500">{club.category} • {club.members} thành viên</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedClub(club);
                setOpenModal(true);
              }}
            >
              📝 Chỉnh sửa
            </Button>
          </div>
        </div>

        {/* Hero */}
        <div className="relative w-full h-64 rounded-xl overflow-hidden mb-8">
          <Image
            src={club.image || "/placeholder.svg"}
            alt={club.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-end p-4">
            <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">
              {club.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left: Main content */}
          <div className="xl:col-span-2 space-y-6">
            {/* Mô tả */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-3">Giới thiệu CLB</h2>
              <p className="text-gray-700 leading-relaxed">
                {club.fullDescription || club.description}
              </p>
            </Card>

            {/* Danh sách thành viên */}
            {club.membersList && (
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Thành viên</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {club.membersList.map((m) => (
                    <div
                      key={m.id}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="w-20 h-20 rounded-full overflow-hidden mb-2 shadow">
                        <Image
                          src={m.avatar || "/placeholder.svg"}
                          alt={m.name}
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      </div>
                      <p className="font-semibold text-gray-800">{m.name}</p>
                      <p className="text-sm text-gray-500">{m.role}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}


          </div>
          

          {/* Right: Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Thông tin cơ bản</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>📍 Địa điểm:</span>
                  <span>{club.location || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span>👥 Thành viên:</span>
                  <span>{club.members}</span>
                </div>
                <div className="flex justify-between">
                  <span>📝 Sự kiện:</span>
                  <span>{club.events}</span>
                </div>
              </div>
            </Card>

            {/* Danh sách đăng ký (nếu có) */}
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Quản lý đăng ký</h3>
              <RegistrationTable eventId={club.id} /> {/* có thể đổi tên prop phù hợp */}
            </Card>
          </div>
          {/* Sự kiện của CLB */}
          {club.upcomingEvents && club.upcomingEvents.length > 0 && (
            <div className="xl:col-span-3">
              <Card className="p-6">
                <EventGrid
                  events={club.upcomingEvents}
                  title={`Sự kiện sắp tới của ${club.name}`}
                  columns={3}
                  hidden
                />
              </Card>
            </div>
          )}

        </div>
      </div>

      {/* Modal update CLB */}
      <ClubModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleUpdateClub}
        loading={loading}
        initialData={selectedClub}
      />
    </section>
  );
}

AdminClubDetail.getLayout = function getLayout(page) {
  const AdminLayout = require("@/components/AdminLayout").default;
  return <AdminLayout>{page}</AdminLayout>;
};
