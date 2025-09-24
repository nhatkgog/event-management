export function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatTime(time) {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + "..."
}
