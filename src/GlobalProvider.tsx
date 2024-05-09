import React, { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';

// Define the shape of your global state
interface GlobalState {
  showAlerts: boolean;
  isEmpty: boolean;
  showMany: boolean;
  showSuccessMessage: boolean; // Add success message state
  setShowAlerts: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEmpty: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMany: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSuccessMessage: React.Dispatch<React.SetStateAction<boolean>>; // Function to toggle success message
}

// Create the context
const GlobalContext = createContext<GlobalState | undefined>(undefined);

// Create a provider component
export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false); // Initialize success message state
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (showSuccessMessage) {
      message.success('Successfuly created'); // Display success message
      setShowSuccessMessage(false); // Reset success message state after displaying
    }
  }, [showSuccessMessage]);

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
        showSuccessMessage,
        setShowAlerts,
        setIsEmpty,
        setShowMany,
        setShowSuccessMessage,
      }}
    >
      {children}
      {showSuccessMessage && <>{contextHolder}</>} {/* Render message component with contextHolder */}

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
