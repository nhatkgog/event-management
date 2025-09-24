"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { events, clubs } from "../lib/data"

export default function GlobalSearch({ placeholder = "Tìm kiếm sự kiện" }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      setIsOpen(false)
      return
    }

    const searchQuery = query.toLowerCase()
    const eventResults = events
      .filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery) ||
          event.description.toLowerCase().includes(searchQuery) ||
          event.category.toLowerCase().includes(searchQuery) ||
          event.organizer.toLowerCase().includes(searchQuery) ||
          event.tags?.some((tag) => tag.toLowerCase().includes(searchQuery)),
      )
      .slice(0, 3)
      .map((event) => ({ ...event, type: "event" }))

    const clubResults = clubs
      .filter(
        (club) =>
          club.name.toLowerCase().includes(searchQuery) ||
          club.description.toLowerCase().includes(searchQuery) ||
          club.category.toLowerCase().includes(searchQuery),
      )
      .slice(0, 3)
      .map((club) => ({ ...club, type: "club" }))

    setResults([...eventResults, ...clubResults])
    setIsOpen(true)
  }, [query])

  const handleInputChange = (e) => {
    setQuery(e.target.value)
  }

  const handleResultClick = () => {
    setIsOpen(false)
    setQuery("")
  }

  return (
    <div ref={searchRef} className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          className="bg-white text-gray-900 px-4 py-2 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-red-300"
        />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            {results.map((result) => (
              <Link
                key={`${result.type}-${result.id}`}
                href={result.type === "event" ? `/events/${result.id}` : `/clubs/${result.id}`}
                onClick={handleResultClick}
                className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${result.type === "event" ? "bg-blue-500" : "bg-green-500"}`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900 truncate">{result.title || result.name}</h4>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          result.type === "event" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                        }`}
                      >
                        {result.type === "event" ? "Sự kiện" : "CLB"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{result.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{result.category}</span>
                      {result.type === "event" && result.date && (
                        <>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{result.date}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Results */}
          <div className="border-t border-gray-200 p-2">
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              onClick={handleResultClick}
              className="block w-full text-center py-2 text-sm text-red-500 hover:text-red-600 font-medium"
            >
              Xem tất cả kết quả cho "{query}"
            </Link>
          </div>
        </div>
      )}

      {/* No Results */}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 text-center text-gray-500">
            <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p className="text-sm">Không tìm thấy kết quả cho "{query}"</p>
          </div>
        </div>
      )}
    </div>
  )
}
