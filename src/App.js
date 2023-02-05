import Router from "./route/Router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { getAccesToken } from "./utilities/localstorage";
import { thunk_getMe } from "./stores/features/auth/myUserSlice";
import Spinner from "./components/ui/Spinner";

function App() {
  const dispatch = useDispatch();
  const [initialState, setInitialState] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        if (getAccesToken()) await dispatch(thunk_getMe());
      } catch (err) {
        console.log(err);
      } finally {
        setInitialState(false);
      }
    };
    fetchMe();
  }, [dispatch]);

  return (
    <>
      {initialState ? (
        <Spinner />
      ) : (
        <div className="App">
          <Router />
          <ToastContainer autoClose="1500" theme="colored" position="bottom-center" hideProgressBar />
        </div>
      )}
    </>
  );
}

export default App;
