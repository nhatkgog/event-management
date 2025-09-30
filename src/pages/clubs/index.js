"use client"

import { useState, useMemo } from "react"
import ClubCard from "../../components/ClubCard"
import Button from "../../components/Button"
import { clubs } from "@/lib/data"
import {getAuth} from "@clerk/nextjs/server";
import {fetchWithInternalAccess} from "@/utils/internalAccess";
import AdminLayout from "@/components/AdminLayout";
import Layout from "../../components/layout/Layout";

export async function getServerSideProps({ req }) {
    try {
        // Fetch all data in parallel for efficiency
        const [clubsRes, categoriesRes] = await Promise.all([
            fetchWithInternalAccess(`/api/club/clubApi`),
            fetchWithInternalAccess(`/api/category/categoryApi`)
        ]);

        // The user role fetching can be done here as well if needed, or separately.
        // For now, we focus on events and categories.
        const { userId } = getAuth(req);
        const clerkUserRes = await fetchWithInternalAccess(`/api/clerk?userId=${userId}`);
        const role = clerkUserRes.private_metadata?.role ?? null;

        return {
            props: {
                initialClubs: clubsRes.data || [],
                initialCategories: categoriesRes.data || [],
                role: role,
            },
        };
    } catch (error) {
        console.error("Error fetching data in getServerSideProps:", error);
        // Return empty arrays as a fallback to prevent the page from crashing.
        return {
            props: {
                initialClubs: [],
                initialCategories: [],
                role: null,
                error: "Could not load data.",
            },
        };
    }
}

// Extended clubs data to match the design
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
  },
  {
    id: 5,
    name: "Creative Canvas",
    category: "ART",
    description:
      "Nơi những tài năng nghệ thuật thể hiện. Từ hội họa, nhiếp ảnh, thiết kế đến các hoạt động sáng tạo khác.",
    members: 10,
    events: 4,
    successRate: "96%",
    image: "/placeholder.svg?key=art1",
  },
  {
    id: 6,
    name: "Dance for passion Club",
    category: "ART",
    description:
      "Câu lạc bộ âm nhạc đa dạng với nhiều thể loại. Từ classical đến pop, rock đến EDM. Biểu diễn tại các sự kiện lớn của trường.",
    members: 8,
    events: 15,
    successRate: "99%",
    image: "/placeholder.svg?key=music1",
  },
  {
    id: 7,
    name: "Business Leaders",
    category: "ACADEMIC",
    description:
      "Phát triển kỹ năng kinh doanh và lãnh đạo. Mô phỏng doanh nghiệp thực tế và networking với các doanh nhân thành đạt.",
    members: 12,
    events: 25,
    successRate: "93%",
    image: "/placeholder.svg?key=business",
  },
  {
    id: 8,
    name: "Global Connect",
    category: "CULTURE",
    description:
      "Kết nối các nền văn hóa khác nhau. Trao đổi ngôn ngữ, tìm hiểu văn hóa và tạo dựng mối quan hệ quốc tế.",
    members: 14,
    events: 20,
    successRate: "97%",
    image: "/placeholder.svg?key=global",
  },
  {
    id: 9,
    name: "Evo Club",
    category: "CULTURE",
    description:
      "Kết nối các nền văn hóa khác nhau. Trao đổi ngôn ngữ, tìm hiểu văn hóa và tạo dựng mối quan hệ quốc tế.",
    members: 14,
    events: 20,
    successRate: "90%",
    image: "/placeholder.svg?key=evo",
  },
]

const categories = [
  { id: "all", label: "Tất cả", color: "bg-red-500" },
  { id: "TECH", label: "Công nghệ", color: "bg-blue-500" },
  { id: "SPORT", label: "Thể thao", color: "bg-green-500" },
  { id: "ART", label: "Nghệ thuật", color: "bg-purple-500" },
  { id: "ACADEMIC", label: "Học thuật", color: "bg-orange-500" },
  { id: "CULTURE", label: "Văn hóa", color: "bg-teal-500" },
]

export default function Index({ initialClubs, initialCategories, role, error }) {
    const SelectedLayout = role === "admin" ? AdminLayout : Layout;
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredClubs = useMemo(() => {
    let filtered = initialClubs

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((club) => club.categoryId.name === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (club) =>
          club.name.toLowerCase().includes(query) ||
          club.description.toLowerCase().includes(query) ||
          club.categoryId.name.toLowerCase().includes(query),
      )
    }

    return filtered
  }, [selectedCategory, searchQuery])

  return (
    <SelectedLayout title="Câu lạc bộ sinh viên - UniVibe">
      <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-500 to-orange-400 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">KHÁM PHÁ CÁC CÂU LẠC BỘ</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Tham gia những hoạt động thú vị, kết nối bạn bè và phát triển kỹ năng cùng các câu lạc bộ sinh viên tại
            trường
          </p>
         
        </div>
      </section>

      {/* Index Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm câu lạc bộ, hoạt động..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <svg
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {initialCategories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => setSelectedCategory(category._id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category._id
                        ? `${category.color} text-white`
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-gray-600">
              Tìm thấy <span className="font-semibold text-red-500">{filteredClubs.length}</span> câu lạc bộ
              {selectedCategory !== "all" && (
                <span>
                  {" "}
                  trong danh mục{" "}
                  <span className="font-semibold">{categories.find((c) => c._id === selectedCategory)?.label}</span>
                </span>
              )}
            </p>
          </div>

          {/* Index Grid */}
          {filteredClubs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {filteredClubs.map((club) => (
                  <ClubCard key={club._id} club={club} />
                ))}
              </div>

              {/* Load More Button */}
              <div className="text-center">
                <Button variant="outline" size="lg">
                  Xem thêm
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Không tìm thấy câu lạc bộ nào</h3>
              <p className="text-gray-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            </div>
          )}
        </div>
      </section>
      </div>
    </SelectedLayout>
  )
}
