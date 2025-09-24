import Image from "next/image"
import Button from "./Button"
import Card from "./Card"

const categoryColors = {
  TECH: "bg-blue-500",
  SPORT: "bg-green-500",
  ART: "bg-purple-500",
  ACADEMIC: "bg-orange-500",
}

export default function ClubCard({ club }) {
  const categoryColor = categoryColors[club.category] || "bg-gray-500"

  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={club.image || "/placeholder.svg"}
          alt={club.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className={`${categoryColor} text-white px-3 py-1 rounded-full text-sm font-medium`}>
            {club.category}
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded text-xs font-medium">
          #{club.id.toString().padStart(3, "0")}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-lg mb-2 group-hover:text-red-500 transition-colors">{club.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{club.description}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-500">{club.members}</div>
            <div className="text-xs text-gray-500">Thành viên</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-500">{club.events}</div>
            <div className="text-xs text-gray-500">Sự kiện</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-500">{club.successRate}</div>
            <div className="text-xs text-gray-500">Thành công</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            Tham gia
          </Button>
          <Button variant="outline" size="sm">
            Chi tiết
          </Button>
        </div>
      </div>
    </Card>
  )
}
