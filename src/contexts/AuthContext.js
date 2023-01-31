import { createContext, useState, useEffect } from "react";
import { getAccesToken } from "../utilities/localstorage";
import Spinner from "../components/ui/Spinner";
import { useDispatch } from "react-redux";
import { getMe } from "../stores/features/auth/userSlice";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const dispatch = useDispatch();
  const [initialLoading, setInitialLoading] = useState(false);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        if (getAccesToken()) {
          dispatch(getMe());
        }
      } catch (err) {
        console.log(err);
      } finally {
        setInitialLoading(false); // ในกรณีที่มี Token แล้วทำการ Refresh หน้า Postpage มันจะกระพริบหน้า Login แปปนึง จึงเขียน Condition เพิ่มให้เป็นหน้า Spinner แทน
      }
    };
    fetchMe();
  }, []);

  if (initialLoading) return <Spinner />;
  return <AuthContext.Provider value={{ initialLoading }}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
