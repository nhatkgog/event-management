// pages/login/sign-in.js
"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { useSignIn } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/layout/Layout";

export default function SignInPage() {
    const router = useRouter();
    const { isLoaded, signIn, setActive } = useSignIn();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Don’t render until Clerk is ready
    if (!isLoaded) return null;

    // Handle email + password submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await signIn.create({
                strategy: "password",
                identifier: email,
                password,
            });

            if (result.status === "complete") {
                // Activate the session and redirect
                await setActive({ session: result.createdSessionId });
                router.push("/");
            }
        } catch (err) {
            setError(err.errors?.[0]?.message || "Đăng nhập thất bại");
        } finally {
            setLoading(false);
        }
    };

    // Handle Google OAuth redirect
    const handleGoogleSignIn = async () => {
        await signIn.authenticateWithRedirect({
            strategy: "oauth_google",
            redirectUrl: "/",   // where to send after successful OAuth
        });
    };

    return (
            <div className="min-h-screen bg-white flex">
                {/* Left side – Your styled form */}
                <div className="flex-1 flex items-center justify-center px-8 sm:px-12 lg:px-16">
                    <div className="max-w-md w-full space-y-8">
                        <div>
                            <h1 className="text-4xl font-bold text-black mb-12">
                                Chào mừng bạn trở lại!
                            </h1>
                            <div className="flex justify-end mb-6">
                                {/*<Link*/}
                                {/*    href="/register"*/}
                                {/*    className="text-red-500 hover:text-red-600 text-sm font-medium"*/}
                                {/*>*/}
                                {/*    Đăng nhập quản trị viên*/}
                                {/*</Link>*/}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email */}
                            <div>
                                <label className="block text-sm text-gray-700 mb-3">
                                    Địa chỉ email
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-4 border-2 border-red-400 rounded-lg focus:outline-none focus:ring-0 focus:border-red-500 text-base"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm text-gray-700 mb-3">
                                    Mật khẩu
                                </label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-4 border-2 border-red-400 rounded-lg focus:outline-none focus:ring-0 focus:border-red-500 text-base"
                                />
                            </div>

                            {/* Error Message */}
                            {error && <p className="text-sm text-red-600">{error}</p>}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 text-base font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors mt-8 disabled:opacity-50"
                            >
                                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                            </button>
                        </form>

                        <div className="space-y-4 mt-8">
                            <div className="flex items-center justify-between text-sm">
                                {/*<span className="text-gray-600">Bạn chưa có tài khoản?</span>*/}
                                {/*<Link*/}
                                {/*    href="/register"*/}
                                {/*    className="text-red-500 hover:text-red-600 font-medium"*/}
                                {/*>*/}
                                {/*    Đăng ký tài khoản*/}
                                {/*</Link>*/}
                            </div>

                            <div className="text-center">
                                {/*<Link*/}
                                {/*    href="/login/forgot-password"*/}
                                {/*    className="text-red-500 hover:text-red-600 text-sm font-medium underline"*/}
                                {/*>*/}
                                {/*    Quên mật khẩu hoặc tên tài khoản?*/}
                                {/*</Link>*/}
                            </div>

                            <div className="text-center text-gray-600 text-sm mt-8 mb-4">
                                Hoặc đăng nhập bằng tài khoản Google của bạn
                            </div>

                            {/* Google OAuth Button */}
                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21
                       3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23
                       1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99
                       20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43
                       8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56
                       4.21 1.64l3.15-3.15C17.45 2.09 14.97 1
                       12 1 7.7 1 3.99 3.47 2.18 7.07l3.66
                       2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Đăng nhập bằng Google
                            </button>
                        </div>
                    </div>
                </div>

                {/* Optional Right Side Image */}
                {/*
        <div className="hidden lg:block flex-1 relative">
          <Image
            src="https://your-image-url.png"
            alt="Illustration"
            fill
            className="object-cover"
          />
        </div>
        */}
            </div>
    );
}
