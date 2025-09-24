// Simple authentication utilities
export function setAuthToken(token) {
  if (typeof window !== "undefined") {
    document.cookie = `auth-token=${token}; path=/; max-age=86400` // 24 hours
    localStorage.setItem("user", JSON.stringify({ token, isAuthenticated: true }))
  }
}

export function getAuthToken() {
  if (typeof window !== "undefined") {
    const cookies = document.cookie.split(";")
    const authCookie = cookies.find((cookie) => cookie.trim().startsWith("auth-token="))
    return authCookie ? authCookie.split("=")[1] : null
  }
  return null
}

export function removeAuthToken() {
  if (typeof window !== "undefined") {
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
    localStorage.removeItem("user")
  }
}

export function isAuthenticated() {
  return !!getAuthToken()
}

// Mock login function
export async function login(email, password) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (email === "admin@univibe.com" && password === "admin123") {
    const token = "mock-admin-token-" + Date.now()
    setAuthToken(token)
    return { success: true, user: { email, role: "admin" } }
  } else if (email === "student@univibe.com" && password === "student123") {
    const token = "mock-student-token-" + Date.now()
    setAuthToken(token)
    return { success: true, user: { email, role: "student" } }
  }

  return { success: false, error: "Email hoặc mật khẩu không đúng" }
}

export function logout() {
  removeAuthToken()
  if (typeof window !== "undefined") {
    window.location.href = "/login"
  }
}
