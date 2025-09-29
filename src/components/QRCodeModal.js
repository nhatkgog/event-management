"use client";

import { useEffect } from "react";

export default function QRCodeModal({ open, onClose, qrUrl }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!open || !qrUrl) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()} 
      >
        <img
          src={`https://quickchart.io/qr?text=${encodeURIComponent(qrUrl)}&size=350`}
          alt="QR Code"
          className="cursor-pointer hover:scale-110 transition-transform"
          onClick={(e) => {
            e.stopPropagation();
            window.open(qrUrl, "_blank");
          }}
        />
        <p className="text-gray-500 text-sm mt-3 text-center">
          Quét mã để thực hiện Check-in / Check-out
        </p>
      </div>
    </div>
  );
}
