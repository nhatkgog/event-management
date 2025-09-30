import { useEffect } from "react";
import EventForm from "@/components/EventForm";

export default function EventModal({ open, onClose, onSubmit, loading, categories, initialData }) {
  // Khóa scroll khi mở modal
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
      {/* Nền mờ khi bật modal */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-gray-200/40 z-40"
      ></div>

      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 pointer-events-none">
        <div
          className="relative bg-white rounded-xl pointer-events-auto w-full max-w-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Nút đóng */}
          <button
            onClick={onClose}
            className="absolute top-4 right-5 text-gray-600 hover:text-red-500 text-2xl font-bold"
          >
            ×
          </button>

          {/* Nội dung Form */}
          <div className="max-h-[95vh] overflow-y-auto scrollbar-hide p-6">
            <EventForm
              onSubmit={onSubmit}
              loading={loading}
              categories={categories}
              initialData={initialData}
            />
          </div>
        </div>
      </div>
    </>
  );
}
