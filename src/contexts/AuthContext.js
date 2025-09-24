"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { getAuthToken, removeAuthToken } from "../lib/auth"

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getAuthToken()
    if (token) {
      // In a real app, you'd validate the token with your API
      setUser({
        email: token.includes("admin") ? "admin@univibe.com" : "student@univibe.com",
        role: token.includes("admin") ? "admin" : "student",
      })
    }
    setLoading(false)
  }, [])

  const login = (userData) => {
    setUser(userData)
  }

  const logout = () => {
    removeAuthToken()
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
