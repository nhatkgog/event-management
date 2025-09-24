import Image from "next/image"
import Button from "./Button"
import Card from "./Card"

const eventImages = {
  1: "/research-conference-academic.jpg",
  2: "/hackathon-coding-programming.jpg",
  3: "/coding-programming-tech.jpg",
  4: "/artificial-intelligence-ai-robot.jpg",
}

export default function EventGrid({ events, title = "ĐỪNG BỎ LỠ CÁC SỰ KIỆN MỚI NHẤT!" }) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="group hover:shadow-lg transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={eventImages[event.id] || "/placeholder.svg?key=event"}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {event.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 line-clamp-2">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{event.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{event.date}</span>
                  <Button size="sm">Tham gia ngay</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Xem thêm
          </Button>
        </div>
      </div>
    </section>
  )
}
