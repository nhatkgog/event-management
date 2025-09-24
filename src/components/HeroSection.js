import Image from "next/image"
import Button from "./Button"

export default function HeroSection({ featuredEvent }) {
  if (!featuredEvent) return null

  return (
    <section className="bg-gradient-to-r from-red-500 to-orange-400 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm">
              Thời gian: {featuredEvent.date} - {featuredEvent.time}
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">{featuredEvent.title}</h1>
            <p className="text-xl text-white/90 leading-relaxed">{featuredEvent.description}</p>
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary" size="lg">
                Chi tiết
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-red-500 bg-transparent"
              >
                Xem lịch trình
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/research-conference-academic.jpg" alt={featuredEvent.title} fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
