import Router from "./route/Router";
import { useSelector } from "react-redux";
import { selectLoading } from "./stores/loadingSlice";
import { ToastContainer } from "react-toastify";
import Spinner from "./components/ui/Spinner";

function App() {
  const loading = useSelector(selectLoading);
  return (
    <>
      {loading && <Spinner />}
      <div className="App">
        <Router />
        <ToastContainer autoClose="1500" theme="colored" position="bottom-center" hideProgressBar />
      </div>
    </>
  );
}

export default App;
