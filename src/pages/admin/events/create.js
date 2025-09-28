import { useState } from "react";
import EventForm from "@/components/EventForm";

export default function CreateEvent() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      // Gọi API tạo sự kiện
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Tạo sự kiện thất bại");
      }

      alert("🎉 Tạo sự kiện thành công!");
      // chuyển hướng về trang danh sách sự kiện
      window.location.href = "/events";
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi tạo sự kiện!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
         <h2 className="text-2xl font-bold mb-6">
        Tạo sự kiện mới
      </h2>

    <div className="max-w-3xl mx-auto p-6 bg-white  rounded-lg">
      <EventForm onSubmit={handleSubmit} loading={loading} />
    </div>
    </div>
  );
}
CreateEvent.getLayout = function getLayout(page) {
  const AdminLayout = require("@/components/AdminLayout").default;
  return <AdminLayout>{page}</AdminLayout>;
};