import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of your global state
interface GlobalState {
  showAlerts: boolean;
  isEmpty: boolean;
  showMany: boolean;
  setShowAlerts: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEmpty: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMany: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context
const GlobalContext = createContext<GlobalState | undefined>(undefined);

// Create a provider component
export const GlobalProvider: React.FC = ({ children }) => {
  const [showAlerts, setShowAlerts] = useState<boolean>(() => {
    const storedShowAlerts = localStorage.getItem('showAlerts');
    return storedShowAlerts ? JSON.parse(storedShowAlerts) : false;
  });

  const [isEmpty, setIsEmpty] = useState<boolean>(() => {
    const storedIsEmpty = localStorage.getItem('isEmpty');
    return storedIsEmpty ? JSON.parse(storedIsEmpty) : false;
  });

  const [showMany, setShowMany] = useState<boolean>(() => {
    const storedShowMany = localStorage.getItem('showMany');
    return storedShowMany ? JSON.parse(storedShowMany) : true;
  });

  useEffect(() => {
    localStorage.setItem('showAlerts', JSON.stringify(showAlerts));
  }, [showAlerts]);

  useEffect(() => {
    localStorage.setItem('isEmpty', JSON.stringify(isEmpty));
  }, [isEmpty]);

  useEffect(() => {
    localStorage.setItem('showMany', JSON.stringify(showMany));
  }, [showMany]);

  return (
    <GlobalContext.Provider
      value={{
        showAlerts,
        isEmpty,
        showMany,
        setShowAlerts,
        setIsEmpty,
        setShowMany,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the global state
export const useGlobalState = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalProvider');
  }
  return context;
};
