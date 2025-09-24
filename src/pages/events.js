"use client"

import { useState, useMemo } from "react"
import Layout from "../components/layout/Layout"
import EventCard from "../components/EventCard"
import EventFilters from "../components/EventFilters"
import { events, categories } from "../lib/data"

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredEvents = useMemo(() => {
    let filtered = events

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((event) => event.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.organizer.toLowerCase().includes(query) ||
          event.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    return filtered
  }, [selectedCategory, searchQuery])

  return (
    <Layout title="Sự kiện sinh viên - UniVibe">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-500 to-orange-400 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm mb-4">SỰ KIỆN NỔI BẬT</div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">KHÁM PHÁ CÁC SỰ KIỆN SINH VIÊN</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Tham gia những hoạt động thú vị, kết nối bạn bè và phát triển kỹ năng cùng các câu lạc bộ sinh viên tại
            trường
          </p>
        </div>
      </section>

      {/* Events Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <EventFilters
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-gray-600">
              Tìm thấy <span className="font-semibold text-red-500">{filteredEvents.length}</span> sự kiện
              {selectedCategory !== "all" && (
                <span>
                  {" "}
                  trong danh mục{" "}
                  <span className="font-semibold">{categories.find((c) => c.id === selectedCategory)?.label}</span>
                </span>
              )}
            </p>
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} showStatus={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2.306"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Không tìm thấy sự kiện nào</h3>
              <p className="text-gray-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}
