import React, { createContext, useState } from 'react';

// Create Context
export const CartContext = createContext();

// Context Provider Component
export const CartProvider = ({ children }) => {
  const [fetchTrigger, setFetchTrigger] = useState(false);

  // Function to trigger fetchData in another component
  const triggerFetch = () => {
    setFetchTrigger((prev) => !prev); // Toggle to signal change
  };

  return (
    <CartContext.Provider value={{ fetchTrigger, triggerFetch }}>
      {children}
    </CartContext.Provider>
  );
};
