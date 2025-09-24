export default function UpcomingEvents({ events = [] }) {
  const defaultEvents = [
    {
      id: 1,
      title: "AI Workshop",
      date: "16 JUL",
      participants: "45/50 participants",
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "E-sport Tournament",
      date: "18 JUL",
      participants: "32/40 participants",
      color: "bg-purple-500",
    },
    {
      id: 3,
      title: "Tech Conference",
      date: "22 JUL",
      participants: "120/150 participants",
      color: "bg-green-500",
    },
  ]

  const displayEvents = events.length > 0 ? events : defaultEvents

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">SỰ KIỆN SẮP TỚI</h3>
      <div className="space-y-4">
        {displayEvents.map((event) => (
          <div key={event.id} className="flex items-center gap-4">
            <div className={`${event.color} text-white px-3 py-2 rounded-lg text-center min-w-[60px]`}>
              <div className="text-xs font-medium">{event.date}</div>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">{event.title}</h4>
              <p className="text-gray-600 text-sm">{event.participants}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
