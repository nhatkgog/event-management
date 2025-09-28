"use client";

import { useState } from "react";
import Button from "./Button";
import Card from "./Card";

export default function EventForm({
  onSubmit,
  categories = [],
  organizerId,
  initialData = null,
}) {
  const [formData, setFormData] = useState({
    organizerId: organizerId || "",
    title: initialData?.title || "",
    description: initialData?.description || "",
    categoryId: initialData?.categoryId || "",
    startAt: initialData?.startAt ? initialData.startAt.slice(0, 16) : "",
    endAt: initialData?.endAt ? initialData.endAt.slice(0, 16) : "",
    status: initialData?.status || "Draft",
    capacity: initialData?.capacity || 50,
    imageUrl: initialData?.imageUrl || "",
    surveyLink: initialData?.surveyLink || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, imageUrl }));
    }
  };

  return (
    <Card className="p-8">
      <h2 className="text-2xl font-bold mb-6">
        {initialData ? "Chỉnh sửa sự kiện" : "Tạo sự kiện mới"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* organizerId hidden */}
        <input type="hidden" name="organizerId" value={formData.organizerId} />

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tên sự kiện
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Hackathon 2025"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mô tả
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Mô tả chi tiết sự kiện..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lĩnh vực
          </label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            required
          >
            <option value="">-- Chọn lĩnh vực --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Start & End */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bắt đầu
            </label>
            <input
              type="datetime-local"
              name="startAt"
              value={formData.startAt}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kết thúc
            </label>
            <input
              type="datetime-local"
              name="endAt"
              value={formData.endAt}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trạng thái
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          >
            <option value="Draft">Draft</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Capacity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số người tham gia tối đa
          </label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            min="1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        {/* Image */}
        <div>
          <div className="flex items-center gap-4">
            <label className="block text-sm font-medium text-gray-700">
              Ảnh sự kiện
            </label>

            {formData.imageUrl ? (
              <div className="flex flex-col items-center">
                <img
                  src={formData.imageUrl}
                  alt="preview"
                  className="w-40 h-40 object-cover rounded-lg border"
                />
                <label className="cursor-pointer mt-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <span
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-yellow-500 
                       text-white font-semibold rounded-full shadow-md 
                       transform transition duration-300 
                       hover:from-yellow-500 hover:to-red-500 hover:scale-105"
                  >
                    Đổi ảnh
                  </span>
                </label>
              </div>
            ) : (
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <span
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-yellow-500 
                     text-white font-semibold rounded-full shadow-md 
                     transform transition duration-300 
                     hover:from-yellow-500 hover:to-red-500 hover:scale-105"
                >
                  Chọn ảnh
                </span>
              </label>
            )}
          </div>
        </div>

        {/* Survey link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Link khảo sát (Google Form)
          </label>
          <input
            type="url"
            name="surveyLink"
            value={formData.surveyLink}
            onChange={handleChange}
            placeholder="https://forms.gle/..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>

        <Button
          type="submit"
          className="w-auto mx-auto px-8 py-3 text-lg font-semibold shadow-md 
             bg-gradient-to-r from-red-500 to-yellow-500 
             rounded-full block 
             transform transition duration-300 
             hover:from-yellow-500 hover:to-red-500 hover:scale-105 cursor-pointer"
        >
          {initialData ? "Cập nhật sự kiện" : "Tạo sự kiện"}
        </Button>
      </form>
    </Card>
  );
}
