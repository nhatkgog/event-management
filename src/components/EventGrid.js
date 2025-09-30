import Image from "next/image"
import Link from "next/link"
import Button from "./Button"
import Card from "./Card"

const eventImages = {
  1: "/research-conference-academic.jpg",
  2: "/hackathon-coding-programming.jpg",
  3: "/coding-programming-tech.jpg",
  4: "/artificial-intelligence-ai-robot.jpg",
}

export default function EventGrid({
  events,
  title = "ĐỪNG BỎ LỠ CÁC SỰ KIỆN MỚI NHẤT!",
  fullWidth = true,
  columns = 4, 
  hidden=false
}) {
  return (
    <section className="py-16">
      <div className={fullWidth ? "container mx-auto px-4" : ""}>
        <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>

        {/* Grid linh hoạt */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns} gap-6`}>
          {events.map((event) => (
            <Card
              key={event.id}
              className="group hover:shadow-lg transition-shadow flex flex-col h-full"
            >
              {/* Ảnh sự kiện */}
              <div className="relative aspect-[16/9] overflow-hidden">
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

              {/* Nội dung */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-lg mb-2 line-clamp-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                  {event.description}
                </p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500">{event.date}</span>
                  <Button size="sm">Tham gia ngay</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className={hidden? "hidden":"text-center mt-8"}>
          <Link href="/events">
            <Button
              variant="outline"
              size="lg"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-sm"
            >
              Xem thêm
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

