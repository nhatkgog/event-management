import { useState } from 'react';
import AdminLayout from "@/components/AdminLayout";
import { fetchWithInternalAccess } from "@/utils/internalAccess";

// Step 1: Fetch all users on the server side to populate the form.
export async function getServerSideProps() {
  try {
    const usersRes = await fetchWithInternalAccess(`/api/user/userApi`);
    if (!usersRes.success) {
      throw new Error(usersRes.message || 'Failed to fetch users.');
    }
    return {
      props: {
        users: usersRes.data || [],
      },
    };
  } catch (error) {
    console.error("Error fetching users for notification page:", error);
    return {
      props: {
        users: [],
        error: "Could not load user data.",
      },
    };
  }
}

// Step 2: Create the form component.
export default function SendNotificationPage({ users, error }) {
  const [recipient, setRecipient] = useState('all'); // Default to all users
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState({ loading: false, message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setStatus({ loading: false, message: 'Title and content are required.' });
      return;
    }

    setStatus({ loading: true, message: 'Sending notification(s)...'});

    try {
      let notificationsToSend = [];

      if (recipient === 'all') {
        // If sending to all, create a notification for each user.
        // Note: For a large number of users, a dedicated bulk API endpoint would be more efficient.
        notificationsToSend = users.map(user => ({
          receiverId: user._id,
          title,
          content,
        }));
      } else {
        // If sending to a single user.
        notificationsToSend.push({
          receiverId: recipient,
          title,
          content,
        });
      }

      // Send all notification requests in parallel.
      const responses = await Promise.all(
        notificationsToSend.map(notificationBody =>
          fetch('/api/notification/notificationApi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(notificationBody),
          })
        )
      );

      // Check if any of the requests failed.
      const failedResponses = responses.filter(res => !res.ok);
      if (failedResponses.length > 0) {
        throw new Error(`${failedResponses.length} out of ${responses.length} notifications failed to send.`);
      }

      setStatus({ loading: false, message: `Successfully sent ${responses.length} notification(s)!` });
      // Clear the form on success
      setTitle('');
      setContent('');

    } catch (err) {
      setStatus({ loading: false, message: `Error: ${err.message}` });
    }
  };

  if (error) {
    return (
      <AdminLayout title="Error">
        <div className="container mx-auto p-4 text-center text-red-500">{error}</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Send Notification">
      <div className="container mx-auto p-4 md:p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Send a New Notification</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-2">Recipient</label>
              <select
                id="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Users ({users.length})</option>
                {users.map(user => (
                  <option key={user._id} value={user._id}>
                    {user.fullName} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="e.g., Upcoming Maintenance"
              />
            </div>

            <div className="mb-8">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                id="content"
                rows="6"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Write your notification message here..."
              ></textarea>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={status.loading}
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:bg-gray-400 transition-colors"
              >
                {status.loading ? 'Sending...' : 'Send Notification'}
              </button>
              {status.message && (
                <p className={`text-sm ${status.message.startsWith('Error') ? 'text-red-500' : 'text-green-500'}`}>
                  {status.message}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
