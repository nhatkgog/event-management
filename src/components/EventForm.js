"use client"

import { useState } from "react"
import Button from "./Button"
import Card from "./Card"

export default function EventForm({ onSubmit, initialData = null }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    date: initialData?.date || "",
    time: initialData?.time || "",
    location: initialData?.location || "",
    category: initialData?.category || "ACADEMIC",
    maxParticipants: initialData?.maxParticipants || 50,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <Card className="p-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">AI Assistant Enabled - Get Smart Suggestions</span>
        </div>
        <h2 className="text-2xl font-bold">Create a New Event</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Tên sự kiện
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Hackathon 2025"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Mô tả
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your event..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              Ngày
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
              Giờ
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Địa điểm
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Room A101"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Lĩnh vực
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="">Select a category</option>
            <option value="TECH">Công nghệ</option>
            <option value="SPORT">Thể thao</option>
            <option value="ART">Nghệ thuật</option>
            <option value="ACADEMIC">Học thuật</option>
          </select>
        </div>

        <div>
          <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700 mb-2">
            Tham gia tối đa
          </label>
          <input
            type="number"
            id="maxParticipants"
            name="maxParticipants"
            value={formData.maxParticipants}
            onChange={handleChange}
            placeholder="e.g. 50"
            min="1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
          />
        </div>

        <Button type="submit" className="w-full py-3 text-lg bg-gradient-to-r from-red-500 to-yellow-500">
          Tạo sự kiện và thông báo
        </Button>
      </form>
    </Card>
  )
}
