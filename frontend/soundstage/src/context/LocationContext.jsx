import React, { createContext, useContext } from "react";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  return (
    <LocationContext.Provider value={{}}>
      {children}
    </LocationContext.Provider>
  );
};

// Add this custom hook for consuming the context
export const useLocations = () => {
  return useContext(LocationContext);
};
