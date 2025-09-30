import Link from 'next/link';
import AdminLayout from "@/components/AdminLayout";
import { fetchWithInternalAccess } from "@/utils/internalAccess";

// Step 1: Fetch the specific user's data on the server side using the ID from the URL.
export async function getServerSideProps(context) {
  const { id } = context.params; // Get the user ID from the dynamic route

  try {
    const userRes = await fetchWithInternalAccess(`/api/user/userApi?id=${id}`);
    if (!userRes.success) {
      throw new Error(userRes.message || `Failed to fetch user with ID: ${id}`);
    }
    return {
      props: {
        user: userRes.data || null,
      },
    };
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    return {
      props: {
        user: null,
        error: "Could not load user data.",
      },
    };
  }
}

// A helper component to display a single detail item
const DetailItem = ({ label, value }) => (
  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{value || 'N/A'}</dd>
  </div>
);

// Step 2: Create the component to display the user's details.
export default function UserDetailsPage({ user, error }) {
  if (error || !user) {
    return (
      <AdminLayout title="Error">
        <div className="container mx-auto p-4 text-center">
          <p className="text-red-500">{error || "User not found."}</p>
          <Link href="/o/users">
            <a className="text-red-600 hover:underline mt-4 inline-block">← Back to User List</a>
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={`User Details: ${user.fullName}`}>
      <div className="container mx-auto p-4 md:p-8">
        <div className="mb-6">
          <Link href="/o/users">
            <a className="text-sm text-red-600 hover:underline">← Back to User List</a>
          </Link>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">User Information</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application role.</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <DetailItem label="Full Name" value={user.fullName} />
              <DetailItem label="Email Address" value={user.email} />
              <DetailItem label="Student Code" value={user.studentCode} />
              <DetailItem label="Database ID" value={user._id} />
              <DetailItem label="Clerk User ID" value={user.clerkUserId} />
              <DetailItem label="Role" value={user.roleId?.name || 'No Role'} />
              <DetailItem 
                label="Status" 
                value={user.isActive ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                ) : (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Inactive</span>
                )}
              />
              <DetailItem label="Joined At" value={new Date(user.createdAt).toLocaleString()} />
            </dl>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
