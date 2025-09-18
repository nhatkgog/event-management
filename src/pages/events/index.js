import { useEffect, useState } from "react";
import Link from "next/link";

export default function EventsPage({ initialEvents, initialUser }) {
  const [user, setUser] = useState(initialUser);
  const [events, setEvents] = useState(initialEvents || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [loginEmail, setLoginEmail] = useState("user@example.com");
  const [loginPassword, setLoginPassword] = useState("user123");

  const [newEvent, setNewEvent] = useState({ title: "", description: "", startAt: "", endAt: "" });

  useEffect(() => {
    if (!initialUser) {
      fetch("/api/auth/me").then(r => r.json()).then(d => setUser(d.user)).catch(() => {});
    }
  }, [initialUser]);

  async function login(e) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: loginEmail, password: loginPassword }) });
    const data = await res.json();
    if (!res.ok) { setError(data.error || "Login failed"); return; }
    setUser(data.user);
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  }

  async function joinEvent(id) {
    const res = await fetch(`/api/attendance/${id}`, { method: "POST" });
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      alert(d.error || "Failed to join");
    } else {
      alert("Joined!");
    }
  }

  async function createEvent(e) {
    e.preventDefault();
    const res = await fetch("/api/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newEvent) });
    const d = await res.json();
    if (!res.ok) { alert(d.error || "Failed to create event"); return; }
    setEvents([d.event, ...events]);
    setNewEvent({ title: "", description: "", startAt: "", endAt: "" });
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Events</h1>

      {!user ? (
        <form onSubmit={login} className="mb-6 border p-4 rounded">
          <h2 className="font-semibold mb-2">Login</h2>
          {error && <p className="text-red-600 mb-2">{error}</p>}
          <div className="flex flex-col gap-2">
            <input className="border p-2 rounded" placeholder="Email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
            <input className="border p-2 rounded" placeholder="Password" type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
            <button className="bg-black text-white px-4 py-2 rounded" type="submit">Login</button>
            <p className="text-sm text-gray-600">Demo accounts: admin@example.com/admin123, org@example.com/org123, user@example.com/user123</p>
          </div>
        </form>
      ) : (
        <div className="mb-6 flex items-center justify-between">
          <p>Logged in as <strong>{user.name || user.email}</strong> ({user.role})</p>
          <button className="border px-3 py-1 rounded" onClick={logout}>Logout</button>
        </div>
      )}

      {user && (user.role === 'admin' || user.role === 'organizer') && (
        <div className="mb-8">
          <Link href="/events/create" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Create Event</Link>
          <form onSubmit={createEvent} className="mt-4 border p-4 rounded">
            <h2 className="font-semibold mb-2">Quick Create Event</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input className="border p-2 rounded" placeholder="Title" value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} />
              <input className="border p-2 rounded" placeholder="Start (ISO)" value={newEvent.startAt} onChange={e => setNewEvent({ ...newEvent, startAt: e.target.value })} />
              <input className="border p-2 rounded" placeholder="End (ISO)" value={newEvent.endAt} onChange={e => setNewEvent({ ...newEvent, endAt: e.target.value })} />
              <input className="border p-2 rounded sm:col-span-2" placeholder="Description" value={newEvent.description} onChange={e => setNewEvent({ ...newEvent, description: e.target.value })} />
            </div>
            <button className="mt-3 bg-black text-white px-4 py-2 rounded" type="submit">Create</button>
          </form>
        </div>
      )}

      {loading ? <p>Loading...</p> : (
        <ul className="space-y-3">
          {events.map(ev => (
            <li key={ev.id} className="border rounded p-3">
              <div className="flex items-center justify-between">
                <div>
                  <Link href={`/events/${ev.id}`} className="font-semibold hover:underline">{ev.title}</Link>
                  <p className="text-sm text-gray-600">{ev.description}</p>
                  <p className="text-xs text-gray-500">{new Date(ev.startAt).toLocaleString()} - {new Date(ev.endAt).toLocaleString()}</p>
                </div>
                {user && <button className="border px-3 py-1 rounded" onClick={() => joinEvent(ev.id)}>Join</button>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    // Import db functions directly for SSR
    const { getCollection } = await import("@/lib/db");

    // Fetch public events (you could filter based on visibility)
    const events = getCollection("events");

    // Check auth
    const token = context.req.cookies.token;
    let user = null;
    if (token) {
      // In a real app, verify JWT token here
      user = { id: 1, email: 'user@example.com', role: 'user' }; // Mock
    }

    return {
      props: {
        initialEvents: events,
        initialUser: user
      }
    };
  } catch (error) {
    console.error("SSR error:", error);
    return {
      props: {
        initialEvents: [],
        initialUser: null
      }
    };
  }
}
