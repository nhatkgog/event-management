import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function EventDetailPage({ initialEvent, initialAttendance, initialUser }) {
  const [user, setUser] = useState(initialUser);
  const [event, setEvent] = useState(initialEvent);
  const [attendance, setAttendance] = useState(initialAttendance || []);
  const [loading, setLoading] = useState(!initialEvent);
  const [error, setError] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!initialUser) {
      fetch("/api/auth/me").then(r => r.json()).then(d => setUser(d.user)).catch(() => {});
    }
    if (!initialEvent && id) {
      fetch(`/api/events/${id}`).then(r => r.json()).then(d => {
        if (d.event) setEvent(d.event);
        else setError("Event not found");
      }).catch(() => setError("Failed to load event"));
      fetch(`/api/attendance/${id}`).then(r => r.json()).then(d => setAttendance(d.attendance || [])).finally(() => setLoading(false));
    }
  }, [id, initialEvent, initialUser]);

  async function joinEvent() {
    const res = await fetch(`/api/attendance/${id}`, { method: "POST" });
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      alert(d.error || "Failed to join");
    } else {
      alert("Joined!");
      // Refresh attendance
      fetch(`/api/attendance/${id}`).then(r => r.json()).then(d => setAttendance(d.attendance || []));
    }
  }

  async function deleteEvent() {
    if (!confirm("Are you sure you want to delete this event?")) return;
    const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
    if (!res.ok) {
      alert("Failed to delete");
    } else {
      router.push("/events");
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!event) return <p>Event not found</p>;

  const canEdit = user && (user.role === 'admin' || (user.role === 'organizer' && event.createdBy === user.id));
  const isJoined = attendance.some(a => a.userId === user?.id);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p className="text-gray-600 mb-2">{event.description}</p>
      <p className="text-sm text-gray-500 mb-4">
        {new Date(event.startAt).toLocaleString()} - {new Date(event.endAt).toLocaleString()}
      </p>

      <div className="flex gap-2 mb-6">
        {user && !isJoined && <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={joinEvent}>Join Event</button>}
        {canEdit && <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={() => router.push(`/events/${id}/edit`)}>Edit</button>}
        {canEdit && <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={deleteEvent}>Delete</button>}
      </div>

      <h2 className="text-2xl font-semibold mb-4">Attendees ({attendance.length})</h2>
      <ul className="space-y-2">
        {attendance.map(att => (
          <li key={att.id} className="border p-2 rounded">
            User ID: {att.userId} - Joined: {new Date(att.joinedAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  try {
    // Import db functions directly for SSR
    const { findById, getCollection } = await import("@/lib/db");

    const event = findById("events", id);
    if (!event) {
      return { notFound: true };
    }

    const attendance = getCollection("attendance").filter((a) => a.eventId === id);

    // Check auth
    const token = context.req.cookies.token;
    let user = null;
    if (token) {
      // In a real app, verify JWT token here
      user = { id: 1, email: 'user@example.com', role: 'user' }; // Mock
    }

    return {
      props: {
        initialEvent: event,
        initialAttendance: attendance,
        initialUser: user
      }
    };
  } catch (error) {
    console.error("SSR error:", error);
    return { notFound: true };
  }
}
