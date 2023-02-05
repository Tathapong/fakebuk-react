import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectMe } from "../stores/features/auth/myUserSlice";
import { selectLoading } from "../stores/loadingSlice";

import LoginPage from "../pages/LoginPage";
import PostPage from "../pages/PostPage";
import FriendPage from "../pages/FriendPage";
import ProfilePage from "../pages/ProfilePage";
import AuthLayout from "../layouts/auth/AuthLayout";
import Spinner from "../components/ui/Spinner";

function Router() {
  const user = useSelector(selectMe);
  const loading = useSelector(selectLoading);
  return (
    <>
      {loading && <Spinner />}
      <Routes>
        {user ? (
          <Route path="/" element={<AuthLayout />}>
            <Route path="/" element={<PostPage />}></Route>
            <Route path="/friend" element={<FriendPage />}></Route>
            <Route path="/profile/:id" element={<ProfilePage />}></Route>
          </Route>
        ) : (
          <>
            <Route path="/" element={<LoginPage />}></Route>
          </>
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default Router;
