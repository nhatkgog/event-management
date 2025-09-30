import Link from 'next/link';
import AdminLayout from "@/components/AdminLayout";
import { fetchWithInternalAccess } from "@/utils/internalAccess";

// Step 1: Fetch all users on the server side.
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
    console.error("Error fetching users list:", error);
    return {
      props: {
        users: [],
        error: "Could not load user data.",
      },
    };
  }
}

// Step 2: Create the component to display the user list.
export default function UserListPage({ users, error }) {
  if (error) {
    return (
      <AdminLayout title="Error">
        <div className="container mx-auto p-4 text-center text-red-500">{error}</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="User Management">
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">User List</h1>
          <span className="text-gray-600">{users.length} users found</span>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">View</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                      <div className="text-sm text-gray-500">{user.studentCode || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.roleId?.name || 'No Role'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.isActive ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Inactive</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/o/users/${user._id}`}>
                        <a className="text-red-600 hover:text-red-900">View Details</a>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
