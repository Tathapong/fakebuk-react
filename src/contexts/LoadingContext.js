import { useContext, createContext, useState } from "react";

const LoadingContext = createContext();

function LoadingContextProvider({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider
      value={{ loading, startLoading: () => setLoading(true), stopLoading: () => setLoading(false) }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

// Custom Hook
export const useLoading = () => useContext(LoadingContext);

export default LoadingContextProvider;
