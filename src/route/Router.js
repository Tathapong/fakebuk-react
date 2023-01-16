import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import PostPage from "../pages/PostPage";
import FriendPage from "../pages/FriendPage";
import ProfilePage from "../pages/ProfilePage";
import Header from "../layouts/header/Header";
import { useAuth } from "../contexts/AuthContext";

function Router() {
  const { user } = useAuth();

  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<Header />}></Route>
          {/* <Route path="/" element={<PostPage />}></Route> */}
          <Route path="/friend" element={<FriendPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
        </>
      ) : (
        <Route path="/" element={<LoginPage />}></Route>
      )}
    </Routes>
  );
}

export default Router;
