"use client"

import { useState } from "react"

const faqs = [
  {
    id: 1,
    question: "Làm thế nào để xem lịch trình sự kiện?",
    answer:
      "Bạn có thể xem lịch trình sự kiện bằng cách truy cập vào trang Sự kiện hoặc nhấp vào nút 'Xem lịch trình' trên từng sự kiện.",
  },
  {
    id: 2,
    question: "Cách đăng ký tham gia câu lạc bộ?",
    answer:
      "Để đăng ký tham gia câu lạc bộ, bạn cần đăng nhập vào tài khoản và nhấp vào nút 'Tham gia' trên trang chi tiết câu lạc bộ.",
  },
  {
    id: 3,
    question: "Thời gian diễn ra sự kiện?",
    answer:
      "Thời gian diễn ra sự kiện được hiển thị rõ ràng trên từng sự kiện. Bạn có thể xem chi tiết thời gian, địa điểm và nội dung sự kiện.",
  },
]

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState(null)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">MỘT SỐ CÂU HỎI VỀ SỰ KIỆN</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="border border-red-200 rounded-lg overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left bg-white hover:bg-red-50 transition-colors flex items-center justify-between"
                onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
              >
                <span className="font-medium">{faq.question}</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${openFAQ === faq.id ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFAQ === faq.id && (
                <div className="px-6 py-4 bg-red-50 border-t border-red-200">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
