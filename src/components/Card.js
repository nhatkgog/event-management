import { cn } from "../lib/utils"

export default function Card({ children, className, ...props }) {
  return (
    <div className={cn("bg-white rounded-lg shadow-md overflow-hidden", className)} {...props}>
      {children}
    </div>
  )
}
