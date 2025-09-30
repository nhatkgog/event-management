"use client";

import { useRouter } from "next/router";
import Image from "next/image";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { clubs } from "../../lib/data";
import EventGrid from "@/components/EventGrid";
import {fetchWithInternalAccess} from "@/utils/internalAccess";
import {getAuth} from "@clerk/nextjs/server";
import AdminLayout from "@/components/AdminLayout";
import Layout from "@/components/layout/Layout";

// Extended clubs data with members + events
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
    membersList: [
      {
        id: 1,
        name: "Nguyễn Văn A",
        role: "Chủ nhiệm",
        avatar: "/member1.jpg",
      },
      {
        id: 2,
        name: "Trần Thị B",
        role: "Phó chủ nhiệm",
        avatar: "/member2.jpg",
      },
      { id: 3, name: "Lê Văn C", role: "Thành viên", avatar: "/member3.jpg" },
      { id: 4, name: "Phạm Thị D", role: "Thành viên", avatar: "/member4.jpg" },
    ],
    upcomingEvents: [
      {
        id: 1,
        title: "Giải đấu bóng đá sinh viên",
        date: "2025-10-15",
        location: "Sân vận động trường",
        description: "Một giải đấu bóng đá giao hữu giữa các khoa.",
      },
      {
        id: 2,
        title: "Workshop Võ thuật Vovinam",
        date: "2025-11-02",
        location: "Nhà đa năng A",
        description: "Buổi chia sẻ kỹ năng võ thuật và rèn luyện thể chất.",
      },
    ],
  },
];

export async function getServerSideProps({ req }){
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

export default function ClubDetail({ initialClubs, initialCategories, role, error }) {
    const SelectedLayout = role === "admin" ? AdminLayout : Layout;

  const router = useRouter();
  const { id } = router.query;

  const club = initialClubs.find((c) => c._id === id);

  if (!club) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">
          Câu lạc bộ không tồn tại
        </h1>
        <Button onClick={() => router.push("/clubs")}>
          Quay lại danh sách câu lạc bộ
        </Button>
      </div>
    );
  }

  const categoryColors = {
    TECH: "bg-blue-500",
    SPORT: "bg-green-500",
    ART: "bg-purple-500",
    ACADEMIC: "bg-orange-500",
    CULTURE: "bg-teal-500",
  };

  return (

        <SelectedLayout>
      {/* Hero Section */}
      <section className="relative h-[400px] lg:h-[500px] overflow-hidden rounded-b-2xl shadow-lg">
        <Image
          src={club.imageUrl || "/placeholder.svg"}
          alt={club.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-end pb-10">
          <div className="container mx-auto px-4 text-white">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`${
                    categoryColors[club.categoryId.name] || "bg-gray-500"
                  } px-4 py-1 rounded-full text-sm font-medium`}
                >
                  {club.categoryId.name}
                </span>
                <span className="bg-white/20 backdrop-blur px-4 py-1 rounded-full text-sm">
                  {club.members} thành viên • {club.events} sự kiện
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-3">
                {club.name}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Giới thiệu */}
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">Giới thiệu</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {club.fullDescription || club.description}
                </p>
              </Card>

              {/*Thành viên CLB */}
              {club.membersList && (
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Thành viên</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {club.membersList.map((member) => (
                      <div
                        key={member._id}
                        className="flex flex-col items-center text-center hover:scale-105 transition"
                      >
                        <div className="w-20 h-20 rounded-full overflow-hidden mb-3 shadow-md">
                          <Image
                            src={member.avatar || "/placeholder.svg"}
                            alt={member.fullName}
                            width={80}
                            height={80}
                            className="object-cover"
                          />
                        </div>
                        <p className="font-semibold text-gray-800">
                          {member.fullName}
                        </p>
                        <p className="text-sm text-gray-500">{member.roleId.name}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="p-6 space-y-4">
                <h3 className="text-xl font-bold mb-4">Thông tin CLB</h3>
                <InfoItem
                  icon="📅"
                  label="Thời gian họp"
                  value={club.meetingTime}
                />
                <InfoItem icon="📍" label="Địa điểm" value={club.location} />
                <InfoItem
                  icon="👥"
                  label="Thành viên"
                  value={`${club.members} người`}
                />
              </Card>

              <Card className="p-6 space-y-4">
                <h3 className="text-xl font-bold mb-4">Tham gia ngay</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="font-medium text-green-800 flex gap-2 items-center mb-1">
                    ✅ Miễn phí tham gia
                  </div>
                  <p className="text-green-700 text-sm">
                    Hoàn toàn miễn phí cho sinh viên
                  </p>
                </div>
                <Button className="w-full" size="lg">
                  Tham gia ngay
                </Button>
                <Button variant="outline" className="w-full">
                  Liên hệ CLB
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>
      {/*Sự kiện sắp tới */}
      {club.upcomingEvents && club.upcomingEvents.length > 0 && (
        <EventGrid
          events={club.upcomingEvents}
          title={`Sự kiện sắp tới của ${club.name}`}
          columns={4}
          hidden
        />
      )}
        </SelectedLayout>
  );
}

// Helper Component cho sidebar info
function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-xl">{icon}</div>
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-gray-600 text-sm">{value}</p>
      </div>
    </div>
  );
}
