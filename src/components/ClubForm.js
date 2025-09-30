"use client";

import { useState } from "react";
import Button from "./Button";
import Card from "./Card";

export default function ClubForm({
  onSubmit,
  categories = [],
  initialData = null,
}) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    categoryId: initialData?.categoryId || "",
    imageUrl: initialData?.imageUrl || "",
    organizerIds: initialData?.organizerIds?.join(", ") || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      organizerIds: formData.organizerIds
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean),
    };
    onSubmit(dataToSubmit);
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
    <Card className="p-8 shadow-none">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {initialData ? "Chỉnh sửa Câu lạc bộ" : "Tạo câu lạc bộ mới"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tên câu lạc bộ
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="CLB Lập Trình"
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
            placeholder="Giới thiệu về CLB..."
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

        {/* Image */}
        <div>
          <div className="flex items-center gap-4">
            <label className="block text-sm font-medium text-gray-700">
              Ảnh đại diện
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

        {/* Organizer IDs */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ID người quản lý (phân cách bằng dấu phẩy)
          </label>
          <input
            type="text"
            name="organizerIds"
            value={formData.organizerIds}
            onChange={handleChange}
            placeholder="abc123, xyz456"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-auto mx-auto px-8 py-3 text-lg font-semibold shadow-md 
             bg-gradient-to-r from-red-500 to-yellow-500 
             rounded-full block 
             transform transition duration-300 
             hover:from-yellow-500 hover:to-red-500 hover:scale-105 cursor-pointer"
        >
          {initialData ? "Cập nhật Câu lạc bộ" : "Tạo Câu lạc bộ"}
        </Button>
      </form>
    </Card>
  );
}
