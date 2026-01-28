// AppContext.tsx
import React, { createContext, useState, ReactNode, useContext } from 'react';

// Define types for the context
interface AppContextProps {
  count: number;
  increment: () => void;
}

// Create context with a default value of undefined
export const AppContext = createContext<AppContextProps | undefined>(undefined);

// AppProvider component to manage and provide state globally
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State management using useState hook
  const [count, setCount] = useState<number>(0);

  // Increment function to update state
  const increment = () => setCount(count + 1);

  return (
    // Providing context values to child components
    <AppContext.Provider value={{ count, increment }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext more easily in components
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
