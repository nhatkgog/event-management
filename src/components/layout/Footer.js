import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-red-500 text-white mt-16">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Cột 1: Logo + mô tả */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Image
              src="/logo.png"
              alt="UniVibe Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-bold">UniVibe</span>
          </div>
          <p className="text-sm text-red-100 leading-relaxed">
            UniVibe là nền tảng kết nối sinh viên với các sự kiện học thuật, công nghệ và giải trí tại các trường đại học trên toàn quốc.
          </p>
        </div>

        {/* Cột 2: Liên kết nhanh */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Liên kết nhanh</h3>
          <ul className="space-y-2 text-red-100">
            <li><Link href="/" className="hover:text-white transition">Trang chủ</Link></li>
            <li><Link href="/events" className="hover:text-white transition">Sự kiện</Link></li>
            <li><Link href="/about" className="hover:text-white transition">Giới thiệu</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Liên hệ</Link></li>
          </ul>
        </div>

        {/* Cột 3: Thông tin liên hệ */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Liên hệ</h3>
          <ul className="space-y-2 text-red-100">
            <li>📍 Đà Nẵng, Việt Nam</li>
            <li>📧 contact@univibe.vn</li>
            <li>📞 0123 456 789</li>
          </ul>
        </div>

        {/* Cột 4: Mạng xã hội */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Theo dõi chúng tôi</h3>
          <div className="flex space-x-4 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              🌐
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              📸
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              🎵
            </a>
          </div>
        </div>
      </div>

      {/* Dòng bản quyền */}
      <div className="border-t border-red-400 mt-8 py-4 text-center text-sm text-red-200">
        &copy; 2025–2026 UniVibe. All rights reserved.
      </div>
    </footer>
  )
}
