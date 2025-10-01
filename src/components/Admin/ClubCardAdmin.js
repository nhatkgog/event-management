import Image from "next/image"
import Link from "next/link"
import Button from "../Button"
import Card from "../Card"

const categoryColors = {
  TECH: "bg-blue-500",
  SPORT: "bg-green-500",
  ART: "bg-purple-500",
  ACADEMIC: "bg-orange-500",
  CULTURE: "bg-teal-500",
}

export default function ClubCardAdmin({ club, onDelete }) {
  const categoryColor = categoryColors[club.category] || "bg-gray-500"

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 flex flex-col">
      {/* Ảnh và category */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={club.imageUrl || "/placeholder.svg"}
          alt={club.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`${categoryColor} text-white px-3 py-1 rounded-full text-sm font-medium`}
          >
            {/* {club.categoryId.name} */}
          </span>
        </div>

        {/* ID */}
        <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded text-xs font-medium">
          #{club._id.slice(0, 3)}
        </div>
      </div>

      {/* Nội dung */}
      <div className="p-6 flex flex-col flex-1">
        {/* Tên CLB */}
        <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-red-500 transition-colors">
          {club.name}
        </h3>

        {/* Mô tả ngắn */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {club.description}
        </p>

        {/* Stats */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-center flex-1">
            <div className="text-xl font-bold text-red-500">{club.members}</div>
            <div className="text-xs text-gray-500">Thành viên</div>
          </div>
          <div className="border-l h-8 mx-4"></div>
          <div className="text-center flex-1">
            <div className="text-xl font-bold text-red-500">{club.events}</div>
            <div className="text-xs text-gray-500">Sự kiện</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex gap-2">
          <Link href={`/o/clubs/${club._id}`} className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full hover:opacity-90 transition"
            >
              Chi tiết
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-full hover:opacity-90 transition"
            onClick={() =>
              onDelete &&
              confirm("Bạn có chắc muốn xóa câu lạc bộ này?") &&
              onDelete(club._id)
            }
          >
            Xóa
          </Button>
        </div>
      </div>
    </Card>
  )
}
