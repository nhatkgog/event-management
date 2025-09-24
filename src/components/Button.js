import { cn } from "../lib/utils"

export default function Button({ children, variant = "primary", size = "md", className, ...props }) {
  const baseClasses = "font-medium rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"

  const variants = {
    primary: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
    secondary: "bg-white text-red-500 border border-red-500 hover:bg-red-50 focus:ring-red-500",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  }

  return (
    <button className={cn(baseClasses, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  )
}
