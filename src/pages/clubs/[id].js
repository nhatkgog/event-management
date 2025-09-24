"use client"

import { useRouter } from "next/router"
import Image from "next/image"
import Layout from "../../components/layout/Layout"
import Button from "../../components/Button"
import Card from "../../components/Card"
import { clubs } from "../../lib/data"

// Extended clubs data
const extendedClubs = [
  ...clubs,
  {
    id: 4,
    name: "Sport Club",
    category: "SPORT",
    description:
      "Câu lạc bộ thể thao đa dạng với các môn thể thao khác nhau. Tổ chức các giải đấu và hoạt động rèn luyện sức khỏe.",
    members: 18,
    events: 6,
    successRate: "94%",
    image: "/martial-arts-vovinam-sport.jpg",
    fullDescription:
      "Sport Club là nơi tập hợp những sinh viên yêu thích thể thao và muốn duy trì lối sống khỏe mạnh. Chúng tôi tổ chức các hoạt động đa dạng từ bóng đá, bóng rổ, cầu lông đến các môn võ thuật truyền thống.",
    activities: ["Bóng đá", "Bóng rổ", "Cầu lông", "Võ thuật", "Chạy bộ"],
    meetingTime: "Thứ 3, Thứ 5 - 17:00-19:00",
    location: "Sân thể thao trường",
  },
]

export default function ClubDetail() {
  const router = useRouter()
  const { id } = router.query

  const club = extendedClubs.find((c) => c.id === Number.parseInt(id))

  if (!club) {
    return (
      <Layout title="Câu lạc bộ không tồn tại - UniVibe">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-600 mb-4">Câu lạc bộ không tồn tại</h1>
          <Button onClick={() => router.push("/clubs")}>Quay lại danh sách câu lạc bộ</Button>
        </div>
      </Layout>
    )
  }

  const categoryColors = {
    TECH: "bg-blue-500",
    SPORT: "bg-green-500",
    ART: "bg-purple-500",
    ACADEMIC: "bg-orange-500",
    CULTURE: "bg-teal-500",
  }

  return (
    <Layout title={`${club.name} - UniVibe`}>
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <Image src={club.image || "/placeholder.svg"} alt={club.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 text-white">
            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-4">
                <span
                  className={`${
                    categoryColors[club.category] || "bg-gray-500"
                  } text-white px-4 py-2 rounded-full text-sm font-medium`}
                >
                  {club.category}
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                  {club.members} thành viên • {club.events} sự kiện
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">{club.name}</h1>
              <p className="text-xl text-white/90">{club.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Club Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">Giới thiệu về câu lạc bộ</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">{club.fullDescription || club.description}</p>
                  <p className="text-gray-700 leading-relaxed">
                    Tham gia câu lạc bộ để có cơ hội học hỏi, giao lưu và phát triển kỹ năng cùng với các bạn sinh viên
                    khác trong trường. Chúng tôi luôn chào đón các thành viên mới với tinh thần cởi mở và nhiệt tình.
                  </p>
                </div>
              </Card>

              {club.activities && (
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Hoạt động chính</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {club.activities.map((activity, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                        <span className="font-medium text-gray-800">{activity}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">Thành tích nổi bật</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-red-50 rounded-lg">
                    <div className="text-3xl font-bold text-red-500 mb-2">{club.members}</div>
                    <div className="text-gray-600">Thành viên tích cực</div>
                  </div>
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-500 mb-2">{club.events}</div>
                    <div className="text-gray-600">Sự kiện đã tổ chức</div>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-500 mb-2">{club.successRate}</div>
                    <div className="text-gray-600">Tỷ lệ thành công</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Thông tin câu lạc bộ</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h8m-8 0H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2"
                      />
                    </svg>
                    <div>
                      <p className="font-medium">Thời gian họp</p>
                      <p className="text-gray-600 text-sm">{club.meetingTime || "Linh hoạt theo lịch"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div>
                      <p className="font-medium">Địa điểm</p>
                      <p className="text-gray-600 text-sm">{club.location || "Phòng họp CLB"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <div>
                      <p className="font-medium">Thành viên</p>
                      <p className="text-gray-600 text-sm">{club.members} người</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Tham gia câu lạc bộ</h3>
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-medium text-green-800">Miễn phí tham gia</span>
                    </div>
                    <p className="text-green-700 text-sm">Hoàn toàn miễn phí cho tất cả sinh viên</p>
                  </div>
                  <Button className="w-full" size="lg">
                    Tham gia ngay
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    Liên hệ CLB
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Danh mục</h3>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`${
                      categoryColors[club.category] || "bg-gray-500"
                    } text-white px-3 py-1 rounded-full text-sm`}
                  >
                    {club.category}
                  </span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
