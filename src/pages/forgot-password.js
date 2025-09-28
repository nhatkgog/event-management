"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { useSignIn } from "@clerk/nextjs";

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
        setError(""); setLoading(true);
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
        setError(""); setLoading(true);
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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
                {step === "send" ? (
                    <>
                        <h2 className="text-2xl font-bold mb-6 text-center">Quên mật khẩu</h2>
                        <form onSubmit={handleSendCode} className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700">Email của bạn</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                            />
                            {error && <p className="text-sm text-red-600">{error}</p>}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                            >
                                {loading ? "Đang gửi..." : "Gửi mã xác thực"}
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold mb-6 text-center">Đặt lại mật khẩu</h2>
                        <form onSubmit={handleResetPassword} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Mã xác thực</label>
                                <input
                                    type="text"
                                    required
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Mật khẩu mới</label>
                                <input
                                    type="password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            {error && <p className="text-sm text-red-600">{error}</p>}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                            >
                                {loading ? "Đang xử lý..." : "Cập nhật mật khẩu"}
                            </button>
                        </form>
                    </>
                )}
                <div className="mt-6 text-center text-sm text-gray-600">
                    <a href="/sign-in" className="text-red-500 hover:underline">← Quay lại đăng nhập</a>
                </div>
            </div>
        </div>
    );
}
