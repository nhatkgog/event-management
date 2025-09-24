import { useEffect, useRef, useState } from "react";

export default function NotificationsPage({ initialUser, initialNotifications }) {
  const [user, setUser] = useState(initialUser);
  const [list, setList] = useState(initialNotifications || []);
  const [error, setError] = useState("");
  const [loginEmail, setLoginEmail] = useState("user@example.com");
  const [loginPassword, setLoginPassword] = useState("user123");
  const esRef = useRef(null);

  useEffect(() => {
    if (!initialUser) {
      fetch("/api/auth/me").then(r => r.json()).then(d => {
        setUser(d.user);
        if (d.user) {
          startStream();
          refresh();
        }
      });
    } else {
      startStream();
    }

    return () => {
      if (esRef.current) { esRef.current.close(); esRef.current = null; }
    }
  }, [initialUser]);

  function startStream() {
    if (esRef.current) return;
    const es = new EventSource("/api/notifications/stream");
    es.onmessage = (evt) => {
      try {
        const data = JSON.parse(evt.data);
        if (data.type === 'notification') {
          setList(prev => [data.payload, ...prev]);
        }
      } catch {}
    };
    es.onerror = () => {};
    esRef.current = es;
  }

  async function refresh() {
    const res = await fetch("/api/notifications");
    const d = await res.json();
    setList(d.notifications || []);
  }

  async function login(e) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: loginEmail, password: loginPassword }) });
    const data = await res.json();
    if (!res.ok) { setError(data.error || "Login failed"); return; }
    setUser(data.user);
    startStream();
    refresh();
  }

  async function markRead() {
    await fetch("/api/notifications", { method: "PUT" });
    refresh();
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>

      {!user ? (
        <form onSubmit={login} className="mb-6 border p-4 rounded">
          <h2 className="font-semibold mb-2">Login</h2>
          {error && <p className="text-red-600 mb-2">{error}</p>}
          <div className="flex flex-col gap-2">
            <input className="border p-2 rounded" placeholder="Email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
            <input className="border p-2 rounded" placeholder="Password" type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
            <button className="bg-black text-white px-4 py-2 rounded" type="submit">Login</button>
          </div>
        </form>
      ) : (
        <div className="flex items-center gap-3 mb-4">
          <span>Logged in as <strong>{user.name || user.email}</strong></span>
          <button className="border px-3 py-1 rounded" onClick={markRead}>Mark all read</button>
        </div>
      )}

      <ul className="space-y-3">
        {list.map(n => (
          <li key={n.id} className={`border p-3 rounded ${n.read ? 'opacity-60' : ''}`}>
            <div className="flex items-start justify-between">
              <div>
                <p>{n.message}</p>
                {n.data && Object.keys(n.data).length > 0 && (
                  <pre className="text-xs text-gray-600 mt-1">{JSON.stringify(n.data)}</pre>
                )}
                <p className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleString()}</p>
              </div>
              {!n.read && <span className="text-[10px] uppercase text-green-700">New</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   try {
//     // Check auth server-side
//     const token = context.req.cookies.token;
//     if (!token) {
//       return {
//         props: {
//           initialUser: null,
//           initialNotifications: []
//         }
//       };
//     }
//     // In a real app, verify JWT token
//     const user = { id: 1, email: 'user@example.com', role: 'user' }; // Mock
//
//     // Import notifications lib directly
//     const { listNotifications } = await import("../../lib/notifications");
//     const notifications = listNotifications(user.id);
//
//     return {
//       props: {
//         initialUser: user,
//         initialNotifications: notifications
//       }
//     };
//   } catch (error) {
//     console.error("SSR error:", error);
//     return {
//       props: {
//         initialUser: null,
//         initialNotifications: []
//       }
//     };
//   }
// }
