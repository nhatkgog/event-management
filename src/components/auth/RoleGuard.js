import { useDbUser } from '@/contexts/UserContext';

/**
 * A component that conditionally renders its children based on the current user's role.
 * It consumes the user profile from the UserContext.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to render if the user has the required role.
 * @param {string[]} props.allowedRoles - An array of role names (e.g., ['admin', 'organizer']) that are allowed to see the content.
 */
export default function RoleGuard({ children, allowedRoles = [] }) {
  const { dbUser } = useDbUser();

  // 1. Get the user's role name from the populated roleId field.
  // The optional chaining `?.` is crucial to prevent errors if dbUser or roleId is null.
  const userRole = dbUser;

  // 2. If the user's role is included in the allowedRoles array, render the children.
  if (allowedRoles.includes(userRole)) {
    return <>{children}</>;
  }

  // 3. Otherwise, render nothing.
  return null;
}
