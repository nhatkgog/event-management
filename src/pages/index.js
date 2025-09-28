"use client"
import { useEffect, useState } from "react"
import HeroSection from "../components/HeroSection"
import EventGrid from "../components/EventGrid"
import FeaturedEventCard from "../components/FeaturedEventCard"
import TestimonialSection from "../components/TestimonialSection"
import FAQSection from "../components/FAQSection"
import { events, testimonials } from "@/lib/data"

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const featuredEvent = events[currentIndex] 
  const recentEvents = events.slice(0, 4)

  const summerEvent = {
    id: "summer",
    title: "FPTU SUMMER JAMBOREE 2025: PROMPT MỘT MÙA HÈ SÔI NỔI",
    description:
      "Những giây phút cùng thăng và hỗi hợp sáng sủa ra tiến đầu trường học thuật, sân chơi nghiên cứu khoa học tầm nhất mành dành cho sinh viên Trường F.",
    date: "26/07/2025",
  }

  return (
    <div>
      {/* ✅ Hero Section auto slide */}
      <HeroSection featuredEvent={featuredEvent} />

      {/* Danh sách sự kiện */}
      <EventGrid events={recentEvents} columns={4} />

      {/* Featured Summer Event */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">CÓ GÌ HOT Ở SỰ KIỆN VỪA QUA?</h2>
          <FeaturedEventCard event={summerEvent} />

          {/* Event Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { name: "INTRODUCTION", color: "bg-blue-500" },
              { name: "JAM TECH PHÁT TRIỂN NĂNG", color: "bg-purple-500" },
              { name: "JAM TECH KHỞI NGHIỆP SÁNG TẠO", color: "bg-green-500" },
              { name: "JAM TECH ĐỊNH HỚI THỂ LỰC", color: "bg-orange-500" },
            ].map((category, index) => (
              <div
                key={index}
                className={`${category.color} text-white p-6 rounded-lg text-center transition-transform hover:scale-105`}
              >
                <h3 className="font-bold text-sm">{category.name}</h3>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="bg-red-500 text-white px-8 py-3 rounded-full hover:bg-red-600 transition-colors">
              Xem điểm danh
            </button>
          </div>
        </div>
      </section>

      <TestimonialSection testimonials={testimonials} />
      <FAQSection />
    </div>
  )
}
