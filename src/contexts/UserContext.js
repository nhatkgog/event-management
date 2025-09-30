import { createContext, useState, useContext } from 'react';

// 1. Create the context
const UserContext = createContext(null);

// 2. Create the Provider component
export function UserProvider({ children }) {
  const [dbUser, setDbUser] = useState(null);

  return (
    <UserContext.Provider value={{ dbUser, setDbUser }}>
      {children}
    </UserContext.Provider>
  );
}

// 3. Create a custom hook for easy consumption
export function useDbUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useDbUser must be used within a UserProvider');
  }
  return context;
}
