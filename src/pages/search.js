"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/router"
import Layout from "../components/layout/Layout"
import EventCard from "../components/EventCard"
import ClubCard from "../components/ClubCard"
import { events, clubs } from "../lib/data"

export default function SearchResults() {
  const router = useRouter()
  const { q: query } = router.query
  const [activeTab, setActiveTab] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")

  const searchResults = useMemo(() => {
    if (!query || typeof query !== "string") return { events: [], clubs: [] }

    const searchQuery = query.toLowerCase()

    const eventResults = events.filter(
      (event) =>
        event.title.toLowerCase().includes(searchQuery) ||
        event.description.toLowerCase().includes(searchQuery) ||
        event.category.toLowerCase().includes(searchQuery) ||
        event.organizer.toLowerCase().includes(searchQuery) ||
        event.tags?.some((tag) => tag.toLowerCase().includes(searchQuery)),
    )

    const clubResults = clubs.filter(
      (club) =>
        club.name.toLowerCase().includes(searchQuery) ||
        club.description.toLowerCase().includes(searchQuery) ||
        club.category.toLowerCase().includes(searchQuery),
    )

    return { events: eventResults, clubs: clubResults }
  }, [query])

  const filteredResults = useMemo(() => {
    let results = { events: [], clubs: [] }

    switch (activeTab) {
      case "events":
        results.events = searchResults.events
        break
      case "clubs":
        results.clubs = searchResults.clubs
        break
      default:
        results = searchResults
    }

    // Sort results
    if (sortBy === "date" && results.events.length > 0) {
      results.events = [...results.events].sort((a, b) => new Date(a.date) - new Date(b.date))
    } else if (sortBy === "popularity") {
      if (results.events.length > 0) {
        results.events = [...results.events].sort((a, b) => b.participants - a.participants)
      }
      if (results.clubs.length > 0) {
        results.clubs = [...results.clubs].sort((a, b) => b.members - a.members)
      }
    }

    return results
  }, [searchResults, activeTab, sortBy])

  const totalResults = filteredResults.events.length + filteredResults.clubs.length

  if (!query) {
    return (
      <Layout title="Tìm kiếm - UniVibe">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-600 mb-4">Nhập từ khóa để tìm kiếm</h1>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title={`Tìm kiếm: ${query} - UniVibe`}>
      {/* Search Header */}
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Kết quả tìm kiếm</h1>
          <p className="text-gray-600 mb-6">
            Tìm thấy <span className="font-semibold text-red-500">{totalResults}</span> kết quả cho "
            <span className="font-semibold">{query}</span>"
          </p>

          {/* Tabs and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === "all"
                    ? "bg-red-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                Tất cả ({totalResults})
              </button>
              <button
                onClick={() => setActiveTab("events")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === "events"
                    ? "bg-red-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                Sự kiện ({searchResults.events.length})
              </button>
              <button
                onClick={() => setActiveTab("clubs")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === "clubs"
                    ? "bg-red-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                Câu lạc bộ ({searchResults.clubs.length})
              </button>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sắp xếp:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="relevance">Liên quan nhất</option>
                <option value="date">Ngày diễn ra</option>
                <option value="popularity">Phổ biến nhất</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {totalResults === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Không tìm thấy kết quả nào</h3>
              <p className="text-gray-500 mb-6">Thử sử dụng từ khóa khác hoặc kiểm tra chính tả</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="text-sm text-gray-500">Gợi ý:</span>
                {["hackathon", "workshop", "thể thao", "nghệ thuật", "công nghệ"].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => router.push(`/search?q=${suggestion}`)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Events Results */}
              {filteredResults.events.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Sự kiện ({filteredResults.events.length})</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredResults.events.map((event) => (
                      <EventCard key={event.id} event={event} showStatus={true} />
                    ))}
                  </div>
                </div>
              )}

              {/* Clubs Results */}
              {filteredResults.clubs.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Câu lạc bộ ({filteredResults.clubs.length})</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredResults.clubs.map((club) => (
                      <ClubCard key={club.id} club={club} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}
