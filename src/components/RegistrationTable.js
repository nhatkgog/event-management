import { useEffect, useState } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import Card from "./Card";

export default function RegistrationTable({ eventId }) {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchRegistrations = async () => {
        try {
          const res = await fetch(`/api/events/${eventId}/registrations`);
          if (!res.ok) throw new Error("Không thể tải danh sách đăng ký");
          const data = await res.json();
          setRegistrations(data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchRegistrations();
    }, [eventId]);

    if (loading) {
      return <Card className="p-6 text-center">⏳ Đang tải...</Card>;
    }

    if (registrations.length === 0) {
      return (
        <Card className="p-6 text-center text-gray-500">
          Chưa có ai đăng ký sự kiện này.
        </Card>
      );
    }

  return (
    <Card className="p-6 overflow-x-auto shadow-lg rounded-2xl">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Danh sách đăng ký
      </h2>

      <table className="w-full text-sm border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left text-gray-600 text-sm uppercase tracking-wider">
            <th className="px-4 py-2">Mã SV</th>
            <th className="px-4 py-2">Họ tên</th>
            <th className="px-4 py-2 text-center">Check-in</th>
            <th className="px-4 py-2 text-center">Check-out</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((reg) => (
            <tr
              key={reg._id}
              className="bg-white shadow-sm hover:shadow-md transition rounded-lg"
            >
              <td className="px-4 py-3 font-medium text-gray-800">
                {reg.user?.studentCode || "—"}
              </td>
              <td className="px-4 py-3 text-gray-700">{reg.user?.fullName}</td>
              <td className="px-4 py-3 text-center">
                {reg.isCheckedIn ? (
                  <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                    <CheckCircleIcon className="w-5 h-5" />
                    Đã Check-in
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-red-500 font-medium">
                    <XCircleIcon className="w-5 h-5" />
                    Chưa
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-center">
                {reg.isCheckedOut ? (
                  <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                    <CheckCircleIcon className="w-5 h-5" />
                    Đã Check-out
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-red-500 font-medium">
                    <XCircleIcon className="w-5 h-5" />
                    Chưa
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
