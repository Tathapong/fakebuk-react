import Router from "./route/Router";
import { ToastContainer } from "react-toastify";
import Spinner from "./components/ui/Spinner";
import { useSelector } from "react-redux";

function App() {
  const loading = useSelector((state) => state.loading);
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
