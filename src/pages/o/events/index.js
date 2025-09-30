"use client";

import { useState } from "react";
import EventCardAdmin from "../../../components/Admin/EventCardAdmin";
import EventModal from "../../../components/EventModal";
import {fetchWithInternalAccess} from "@/utils/internalAccess";
import {getAuth} from "@clerk/nextjs/server";
import AdminLayout from "@/components/AdminLayout";
import Layout from "@/components/layout/Layout";
import {forRoleOnly} from "@/lib/auth-utils";

export const getServerSideProps = forRoleOnly(["organizer", "admin"], async ({ req }) => {
    try {
        // Fetch all data in parallel for efficiency
        const [eventRes, categoriesRes] = await Promise.all([
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
                initialEvents: eventRes.data || [],
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
});

export default function EventsPage({ initialEvents, initialCategories, role, error }) {
    const SelectedLayout = role === "admin" ? AdminLayout : Layout;
  const [eventList, setEventList] = useState(initialEvents);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreateEvent = async (formData) => {
    try {
      setLoading(true);

      const newEvent = await fetchWithInternalAccess("/api/event/eventApi", 'POST', formData);

      if (newEvent.success === false) {
        throw new Error("Tạo sự kiện thất bại");
      }

      setEventList((prev) => [...prev, newEvent]);

      alert("🎉 Tạo sự kiện thành công!");
      setOpenModal(false);
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi tạo sự kiện!");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      const response = await fetchWithInternalAccess(`/api/event/eventApi?id=${id}`, 'DELETE');

      if (!response.ok) throw new Error("Xóa sự kiện thất bại");

      setEventList((prev) => prev.filter((ev) => ev.id !== id));

      alert("🗑️ Đã xóa sự kiện!");
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi xóa sự kiện!");
    }
  };

  return (
      <SelectedLayout>
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Danh sách sự kiện</h1>
        <button
          onClick={() => setOpenModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-lg font-semibold shadow hover:scale-105 transform transition"
        >
          Create New
        </button>
      </div>

      <div className="container mx-auto px-4">
        {eventList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventList.map((event) => (
              <EventCardAdmin
                key={event._id}
                event={event}
                showStatus={true}
                onDelete={handleDeleteEvent}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2.306"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Không có sự kiện nào
            </h3>
          </div>
        )}
      </div>
      <EventModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleCreateEvent}
        categories={initialCategories}
        loading={loading}
      />
    </div>
          </SelectedLayout>
  );
}

// EventsPage.getLayout = function getLayout(page) {
//   const AdminLayout = require("@/components/AdminLayout").default;
//   return <AdminLayout>{page}</AdminLayout>;
// };
