import { useEffect } from "react";
import EventForm from "@/components/EventForm";

export default function EventModal({ open, onClose, onSubmit, loading }) {
useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-gray-200/40 z-40"
      ></div>

      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 pointer-events-none">
        <div
          className="relative rounded-xl pointer-events-auto"
          onClick={(e) => e.stopPropagation()} // Ngăn click lan ra overlay
        >
          {/* Nút đóng */}
          <button
            onClick={onClose}
            className="absolute top-8 right-10 text-gray-600 hover:text-red-500 text-2xl font-bold"
          >
            ×
          </button>

          {/* Nội dung có thể scroll nhưng ẩn thanh scroll */}
          <div className="max-h-[95vh] overflow-y-auto scrollbar-hide p-4">
            <EventForm onSubmit={onSubmit} loading={loading} />
          </div>
        </div>
      </div>
    </>
  );
}
