export default function StatCard({ icon, value, label, color = "bg-blue-500" }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center">
        <div className={`${color} rounded-lg p-3 mr-4`}>
          <div className="text-white text-2xl">{icon}</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-gray-900">{value}</div>
          <div className="text-gray-600 text-sm">{label}</div>
        </div>
      </div>
    </div>
  )
}
