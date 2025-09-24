import Layout from "../components/layout/Layout"
import HeroSection from "../components/HeroSection"
import EventGrid from "../components/EventGrid"
import FeaturedEventCard from "../components/FeaturedEventCard"
import TestimonialSection from "../components/TestimonialSection"
import FAQSection from "../components/FAQSection"
import { events, testimonials } from "@/lib/data"

export default function Home() {
  const featuredEvent = events[0] // First event as featured
  const recentEvents = events.slice(0, 4) // Show first 4 events
  const summerEvent = {
    id: "summer",
    title: "FPTU SUMMER JAMBOREE 2025: PROMPT MỘT MÙA HÈ SÔING NỔI",
    description:
      "Những giây phút cùng thăng và hỗi hợp sáng sủa ra tiến đầu trường học thuật, sân chơi nghiên cứu khoa học tầm nhất mành dành cho sinh viên Trường F.",
    date: "26/07/2025",
  }

  return (
    <Layout>
      <HeroSection featuredEvent={featuredEvent} />
      <EventGrid events={recentEvents} />

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
              <div key={index} className={`${category.color} text-white p-6 rounded-lg text-center`}>
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
    </Layout>
  )
}
