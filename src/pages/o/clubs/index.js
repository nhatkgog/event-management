"use client"

import { useState } from "react"
import { clubs } from "@/lib/data"
import ClubCardAdmin from "@/components/Admin/ClubCardAdmin"
import ClubModal from "@/components/ClubModal"
import {fetchWithInternalAccess} from "@/utils/internalAccess";
import {getAuth} from "@clerk/nextjs/server";
import AdminLayout from "@/components/AdminLayout";
import Layout from "@/components/layout/Layout";
import {forRoleOnly} from "@/lib/auth-utils";

export const getServerSideProps = forRoleOnly("admin", async ({ req }) => {
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
});

export default function ClubsPage({ initialClubs, initialCategories, role, error }) {
    const SelectedLayout = role === "admin" ? AdminLayout : Layout;
  const [clubList, setClubList] = useState(initialClubs);
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)

  // 🆕 Tạo CLB
  const handleCreateClub = async (formData) => {
    try {
      setLoading(true)

      const newClub = await fetchWithInternalAccess("/api/club/clubApi", "POST", formData);

      if (newClub.success === false) throw new Error("Tạo CLB thất bại")

      setClubList((prev) => [...prev, newClub])

      alert("🎉 Tạo CLB thành công!")
      setOpenModal(false)
    } catch (error) {
      console.error(error)
      alert("Có lỗi xảy ra khi tạo CLB!")
    } finally {
      setLoading(false)
    }
  }

  // ❌ Xóa CLB
  const handleDeleteClub = async (id) => {
    try {
      const response = await fetchWithInternalAccess(`/api/club/clubApi?id=${id}`, "DELETE");

      if (response.success === false) throw new Error("Xóa CLB thất bại")

      setClubList((prev) => prev.filter((club) => club._id !== id))
      alert("🗑️ Đã xóa CLB!")
    } catch (error) {
      console.error(error)
      alert("Có lỗi xảy ra khi xóa CLB!")
    }
  }

  return (
      <SelectedLayout>
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Danh sách câu lạc bộ</h1>
        <button
          onClick={() => setOpenModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold shadow hover:scale-105 transform transition"
        >
          Create New
        </button>
      </div>

      {/* Grid Clubs */}
      <div className="container mx-auto px-4">
        {clubList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clubList.map((club) => (
              <ClubCardAdmin
                key={club._id}
                club={club}
                onDelete={handleDeleteClub}
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Không có câu lạc bộ nào
            </h3>
          </div>
        )}
      </div>

      {/* Modal tạo mới CLB */}
      <ClubModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleCreateClub}
        categories={initialCategories}
        loading={loading}
      />
    </div>
      </SelectedLayout>
  )
}

// ClubsPage.getLayout = function getLayout(page) {
//   const AdminLayout = require("@/components/AdminLayout").default
//   return <AdminLayout>{page}</AdminLayout>
// }
