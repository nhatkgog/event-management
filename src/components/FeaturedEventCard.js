import Image from "next/image"
import Button from "./Button"
import Card from "./Card"

export default function FeaturedEventCard({ event }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 relative h-64 lg:h-auto">
          <Image src="/hackathon-coding-programming.jpg" alt={event.title} fill className="object-cover" />
        </div>
        <div className="lg:w-1/2 p-8">
          <div className="mb-4">
            <span className="text-sm text-gray-500">Thời gian: {event.date}</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">{event.description}</p>
          <Button>Chi tiết</Button>
        </div>
      </div>
    </Card>
  )
}
