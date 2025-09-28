import { useState, useMemo } from "react";
import EventCard from "../../components/EventCard";
import EventFilters from "../../components/EventFilters";
import Layout from "../../components/layout/Layout";
import AdminLayout from "@/components/AdminLayout";
import { getAuth } from "@clerk/nextjs/server";
import { fetchWithInternalAccess } from "@/utils/internalAccess";

// This function runs on the server before the page is rendered.
export async function getServerSideProps({ req }) {
  try {
    // Fetch all data in parallel for efficiency
    const [eventsRes, categoriesRes] = await Promise.all([
      fetchWithInternalAccess(`/api/event/eventApi`),
      fetchWithInternalAccess(`/api/category/categoryApi`)
    ]);

    // The user role fetching can be done here as well if needed, or separately.
    // For now, we focus on events and categories.
    const { userId } = getAuth(req);
    const clerkUserRes = await fetchWithInternalAccess(`/api/clerk?userId=${userId}`);
    const role = clerkUserRes.private_metadata?.role ?? null;

    return {
      props: {
        initialEvents: eventsRes.data || [],
        initialCategories: categoriesRes.data || [],
        role: role,
      },
    };
  } catch (error) {
    console.error("Error fetching data in getServerSideProps:", error);
    // Return empty arrays as a fallback to prevent the page from crashing.
    return {
      props: {
        initialEvents: [],
        initialCategories: [],
        role: null,
        error: "Could not load data.",
      },
    };
  }
}

// The page component now receives the data as props.
export default function Index({ initialEvents, initialCategories, role, error }) {
  const SelectedLayout = role === "admin" ? AdminLayout : Layout;
  
  // The component uses client-side state for filtering.
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // The useMemo hook now works on the data passed in as props.
  const filteredEvents = useMemo(() => {
    let filtered = initialEvents;

    if (selectedCategory !== "all") {
      // Note: The category data from the API has `_id` and `name`.
      // We'll assume the filter component provides the category `name`.
      filtered = filtered.filter((event) => event.categoryId?.name === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          (event.organizerId?.fullName || '').toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery, initialEvents]);

  if (error) {
    return (
      <SelectedLayout title="Error - UniVibe">
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold text-red-600 mb-2">Error loading events</h3>
          <p className="text-gray-500">There was a problem fetching data from the server. Please try again later.</p>
        </div>
      </SelectedLayout>
    )
  }

  return (
    <SelectedLayout title="Sự kiện sinh viên - UniVibe">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-500 to-orange-400 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">KHÁM PHÁ CÁC SỰ KIỆN SINH VIÊN</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Tham gia những hoạt động thú vị, kết nối bạn bè và phát triển kỹ năng cùng các câu lạc bộ sinh viên tại trường
          </p>
        </div>
      </section>

      {/* Index Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <EventFilters
            categories={initialCategories} // Pass categories to the filter component
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <div className="mb-8">
            <p className="text-gray-600">
              Tìm thấy <span className="font-semibold text-red-500">{filteredEvents.length}</span> sự kiện
              {selectedCategory !== "all" && (
                <span>
                  {" trong danh mục "}
                  <span className="font-semibold">{selectedCategory}</span>
                </span>
              )}
            </p>
          </div>

          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <EventCard key={event._id} event={event} showStatus={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2.306" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Không tìm thấy sự kiện nào</h3>
              <p className="text-gray-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            </div>
          )}
        </div>
      </section>
    </SelectedLayout>
  );
}
