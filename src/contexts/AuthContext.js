import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../api/authApi";
import * as userService from "../api/userApi";
import { addAccesToken, getAccesToken, removeAccesToken } from "../utilities/localstorage";
import Spinner from "../components/ui/Spinner";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();

  // Use effect สำหรับ เรียกข้อมูล User แต่ถ้าไม่มี Token ก็ไม่ต้องทำ
  useEffect(() => {
    const fetchMe = async () => {
      try {
        if (getAccesToken()) await getMe();
      } catch (err) {
        console.log(err);
      } finally {
        setInitialLoading(false); // ในกรณีที่มี Token แล้วทำการ Refresh หน้า Postpage มันจะกระพริบหน้า Login แปปนึง จึงเขียน Condition เพิ่มให้เป็นหน้า Spinner แทน
      }
    };
    fetchMe();
  }, []);

  const getMe = async () => {
    const res = await authService.getMe();
    setUser(res.data.user);
  };

  const register = async (input) => {
    const res = await authService.register(input);
    addAccesToken(res.data.token);
    setTimeout(() => getMe(), 1);
  };

  const login = async (input) => {
    const res = await authService.login(input);
    addAccesToken(res.data.token);
    await getMe();
  };

  const logout = async () => {
    setUser(null);
    removeAccesToken();
  };

  const updateUser = async (input) => {
    const res = await userService.updateUser(input);
    setUser(res.data.user);
  };

  if (initialLoading) return <Spinner />;
  return (
    <AuthContext.Provider value={{ user, register, login, logout, initialLoading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
