"use client";

import { useState } from "react";
import { Search, Eye, ChevronLeft, ChevronRight, UserCog } from "lucide-react";
import Link from "next/link";

const roleColors = {
  Admin: "bg-red-100 text-red-700",
  User: "bg-green-100 text-green-700",
  "Club Leader": "bg-orange-100 text-orange-700",
};

const sampleUsers = Array.from({ length: 27 }, (_, i) => ({
  _id: String(i + 1),
  studentCode: `SV${String(i + 1).padStart(3, "0")}`,
  fullName: `Người Dùng ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: { name: i % 3 === 0 ? "Admin" : i % 3 === 1 ? "User" : "Club Leader" },
  isActive: i % 2 === 0,
}));

export default function UserManagementPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 10;

  // Lọc dữ liệu theo search và role
  const filteredUsers = sampleUsers.filter((u) => {
    const matchSearch =
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.studentCode.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter ? u.role.name === roleFilter : true;
    return matchSearch && matchRole;
  });

  // Tính phân trang
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  const uniqueRoles = [...new Set(sampleUsers.map((u) => u.role.name))];

  const handlePrevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <UserCog className="w-8 h-8 text-red-500" /> Quản lý người dùng
          </h1>
          {/* Search & Filter */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Tìm theo tên hoặc mã SV..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-400"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-lg text-sm px-3 py-2 focus:ring-2 focus:ring-red-400"
            >
              <option value="">Tất cả vai trò</option>
              {uniqueRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bảng danh sách */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Mã SV</th>
                <th className="px-4 py-3 text-left">Họ tên</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Vai trò</th>
                <th className="px-4 py-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3">{user.studentCode || "—"}</td>
                    <td className="px-4 py-3 font-medium">{user.fullName}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          roleColors[user.role.name] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {user.role.name}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Link
                        href={`/o/users/${user._id}`}
                        className="group relative inline-flex items-center justify-center text-blue-500 hover:text-blue-600 transition"
                      >
                        <Eye className="w-5 h-5" />
                        <span className="absolute bottom-full mb-1 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
                          Xem chi tiết
                        </span>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-gray-400 italic"
                  >
                    Không tìm thấy người dùng nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-sm font-medium">
              Trang {currentPage} / {totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
