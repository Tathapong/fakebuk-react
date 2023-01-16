import { createContext, useState, useContext } from "react";
import * as authService from "../api/authApi";
import { addAccesToken } from "../utilities/localstorage";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const register = async (input) => {
    const res = await authService.register(input);
    setTimeout(() => setUser(true), 1);
    addAccesToken(res.data.token);
  };

  const login = async (input) => {
    const res = await authService.login(input);
    setUser(true);
    addAccesToken(res.data.token);
  };

  return <AuthContext.Provider value={{ user, register, login }}>{children}</AuthContext.Provider>;
}

// Custom hook

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
