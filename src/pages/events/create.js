import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function CreateEventPage({ initialUser }) {
  const [user, setUser] = useState(initialUser);
  const [error, setError] = useState("");
  const [newEvent, setNewEvent] = useState({ title: "", description: "", startAt: "", endAt: "" });
  const router = useRouter();

  useEffect(() => {
    if (!initialUser) {
      fetch("/api/auth/me").then(r => r.json()).then(d => {
        if (!d.user) {
          router.push("/events");
        } else if (d.user.role !== 'admin' && d.user.role !== 'organizer') {
          router.push("/events");
        } else {
          setUser(d.user);
        }
      }).catch(() => router.push("/events"));
    } else if (initialUser.role !== 'admin' && initialUser.role !== 'organizer') {
      router.push("/events");
    }
  }, [initialUser, router]);

  async function createEvent(e) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newEvent) });
    const d = await res.json();
    if (!res.ok) {
      setError(d.error || "Failed to create event");
      return;
    }
    router.push("/events");
  }

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>

      <form onSubmit={createEvent} className="border p-4 rounded">
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <div className="grid grid-cols-1 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Title"
            value={newEvent.title}
            onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
            required
          />
          <textarea
            className="border p-2 rounded"
            placeholder="Description"
            value={newEvent.description}
            onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
            rows={4}
          />
          <input
            className="border p-2 rounded"
            type="datetime-local"
            placeholder="Start Date & Time"
            value={newEvent.startAt}
            onChange={e => setNewEvent({ ...newEvent, startAt: e.target.value })}
            required
          />
          <input
            className="border p-2 rounded"
            type="datetime-local"
            placeholder="End Date & Time"
            value={newEvent.endAt}
            onChange={e => setNewEvent({ ...newEvent, endAt: e.target.value })}
            required
          />
        </div>
        <button className="mt-4 bg-black text-white px-4 py-2 rounded" type="submit">Create Event</button>
      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    // Check auth server-side
    const { req } = context;
    const token = req.cookies.token;
    if (!token) {
      return {
        redirect: {
          destination: '/events',
          permanent: false,
        },
      };
    }
    // In a real app, verify JWT token and check role
    // For now, assume it's valid and has organizer role
    const user = { id: 1, email: 'user@example.com', role: 'organizer' }; // Mock
    return {
      props: {
        initialUser: user
      }
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/events',
        permanent: false,
      },
    };
  }
}
