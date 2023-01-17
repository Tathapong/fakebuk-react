import { createContext, useState, useContext, useEffect } from "react";
import * as authService from "../api/authApi";
import { addAccesToken, getAccesToken, removeAccesToken } from "../utilities/localstorage";
import Spinner from "../components/ui/Spinner";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  // Use effect สำหรับ เรียกข้อมูล User แต่ถ้าไม่มี Token ก็ไม่ต้องทำ
  useEffect(() => {
    const fetch = async () => {
      try {
        await getMe();
      } catch (err) {
      } finally {
        setInitialLoading(false);
      }
    };
    if (getAccesToken()) fetch();
    setInitialLoading(false); // ในกรณีที่มี Token แล้วทำการ Refresh หน้า Postpage มันจะกระพริบหน้า Login แปปนึง จึงเขียน Condition เพิ่มให้เป็นหน้า Spinner แทน
  }, []);

  const getMe = async () => {
    const res = await authService.getMe();
    setUser(res.data.user);
  };

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

  const logout = async () => {
    setUser(null);
    removeAccesToken();
  };

  if (initialLoading) return <Spinner />;
  return (
    <AuthContext.Provider value={{ user, register, login, logout, initialLoading }}>{children}</AuthContext.Provider>
  );
}

// Custom hook

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
