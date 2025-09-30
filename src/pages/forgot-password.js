"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { useSignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();

  const [step, setStep] = useState("send");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isLoaded) return null;

  const handleSendCode = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setStep("reset");
    } catch (err) {
      setError(err.errors?.[0]?.message || "Không thể gửi mã xác thực.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password: newPassword,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || "Không thể đặt lại mật khẩu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-16 bg-white">
        <div className="max-w-md w-full mx-auto">
          {step === "send" ? (
            <>
              <h1 className="text-3xl font-bold text-black mb-8 text-center lg:text-left">
                Quên mật khẩu
              </h1>
              <form onSubmit={handleSendCode} className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Địa chỉ email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-red-400 rounded-lg focus:outline-none focus:border-red-500"
                  />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors mt-4 disabled:opacity-50"
                >
                  {loading ? "Đang gửi mã..." : "Gửi mã xác thực"}
                </button>
              </form>

              <div className="mt-6 text-sm text-center">
                <Link
                  href="/login/sign-in"
                  className="text-red-500 hover:text-red-600 font-medium"
                >
                  ← Quay lại đăng nhập
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-black mb-8 text-center lg:text-left">
                Đặt lại mật khẩu
              </h1>
              <form onSubmit={handleResetPassword} className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Mã xác thực
                  </label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-red-400 rounded-lg focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Mật khẩu mới
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-red-400 rounded-lg focus:outline-none focus:border-red-500"
                  />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors mt-4 disabled:opacity-50"
                >
                  {loading ? "Đang xử lý..." : "Cập nhật mật khẩu"}
                </button>
              </form>

              <div className="mt-6 text-sm text-center">
                <Link
                  href="/login/sign-in"
                  className="text-red-500 hover:text-red-600 font-medium"
                >
                  ← Quay lại đăng nhập
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block w-1/2 relative h-screen overflow-hidden">
        <Image
          src="/fpt-building.png"
          alt="FPT Building"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
    </div>
  );
}

ForgotPasswordPage.getLayout = function getLayout(page) {
  const AuthLayout = require("@/components/layout/AuthLayout").default;
  return <AuthLayout>{page}</AuthLayout>;
};
