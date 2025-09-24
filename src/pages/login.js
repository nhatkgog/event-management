"use client"

import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Image from "next/image"
import Layout from "../components/layout/Layout"
import Button from "../components/Button"
import { login } from "@/lib/auth"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const result = await login(email, password)
      if (result.success) {
        router.push(result.user.role === "admin" ? "/admin" : "/")
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError("Đã có lỗi xảy ra. Vui lòng thử lại.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout title="Đăng nhập - UniVibe">
      <div className="min-h-screen bg-gray-50 flex">
        {/* Left side - Login form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Chào mừng bạn trở lại!</h2>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">{error}</div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Địa chỉ email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-red-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Nhập email của bạn"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-red-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Nhập mật khẩu"
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full py-3 text-lg">
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>

              <div className="text-center space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Bạn chưa có tài khoản?</span>
                  <Link href="/register" className="text-red-500 hover:text-red-600">
                    Đăng ký tài khoản
                  </Link>
                </div>

                <Link href="/forgot-password" className="text-red-500 hover:text-red-600 text-sm block">
                  Quên mật khẩu hoặc tên tài khoản?
                </Link>

                <div className="text-gray-600 text-sm">Hoặc đăng nhập bằng tài khoản Google của bạn</div>

                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-full bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Đăng nhập bằng Google
                </button>
              </div>
            </form>

            {/* Demo credentials */}
            {/*<div className="mt-8 p-4 bg-blue-50 rounded-lg">*/}
            {/*  <h3 className="font-medium text-blue-900 mb-2">Demo Accounts:</h3>*/}
            {/*  <div className="text-sm text-blue-800 space-y-1">*/}
            {/*    <div>Admin: admin@univibe.com / admin123</div>*/}
            {/*    <div>Student: student@univibe.com / student123</div>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
        </div>

        {/* Right side - Image */}
        <div className="hidden lg:block flex-1 relative">
          {/*<Image*/}
          {/*  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%C4%90%C4%83ng%20nh%E1%BA%ADp-A9QbloBNuCe9lzWG10jSUqtdY0Dgo5.png"*/}
          {/*  alt="Student with books"*/}
          {/*  fill*/}
          {/*  className="object-cover"*/}
          {/*/>*/}
        </div>
      </div>
    </Layout>
  )
}
