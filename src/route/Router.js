import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import PostPage from "../pages/PostPage";
import { useAuth } from "../contexts/AuthContext";

function Router() {
  const { user } = useAuth();

  return (
    <Routes>
      {user ? <Route path="/" element={<PostPage />}></Route> : <Route path="/" element={<LoginPage />}></Route>}
    </Routes>
  );
}

export default Router;
