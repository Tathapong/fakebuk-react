import ProfileCover from "../profille/ProfileCover";
import ProfileInfo from "./ProfileInfo";
import PostList from "../post/PostList";
import { toast } from "react-toastify";

import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { selectUser, thunk_getUserById } from "../../stores/features/users/userSlice";
import { selectUserPost, thunk_getUserPost } from "../../stores/features/posts/postSlice";

function ProfileContainer() {
  const dispatch = useDispatch();
  const { id: profileId } = useParams();

  const user = useSelector(selectUser);
  const posts = useSelector(selectUserPost);

  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(thunk_getUserById(profileId));
        await dispatch(thunk_getUserPost(profileId));
      } catch (err) {
        console.log(err.message);
        toast.error(err.message);
      }
    };
    fetch();
  }, [profileId, dispatch]);

  return (
    <>
      <div className="shadow-sm pb-2" style={{ backgroundImage: "linear-gradient(#f0f2f5, #fff)" }}>
        <ProfileCover coverImage={user.coverImage} />
        <ProfileInfo />
      </div>
      <div className="mx-auto py-4 max-w-152">
        <div className="mx-2 d-flex flex-column gap-3">
          <PostList posts={posts} />
        </div>
      </div>
    </>
  );
}

export default ProfileContainer;
