import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMe } from "../../stores/features/auth/myUserSlice";
import { thunk_getUserPost, selectUserPost } from "../../stores/features/posts/postSlice";
import { toast } from "react-toastify";

import PostCreateToggle from "./PostCreateToggle";
import PostList from "./PostList";

function PostContainer() {
  const dispatch = useDispatch();
  const myUser = useSelector(selectMe);
  const posts = useSelector(selectUserPost);

  const { id: myUserId } = myUser;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        await dispatch(thunk_getUserPost(myUserId, "friend"));
      } catch (err) {
        console.log(err.message);
        toast.error(err.message);
      } finally {
      }
    };
    fetchPost();
  }, [dispatch, myUserId]);

  return (
    <div className="mx-auto py-4 max-w-152">
      <div className="mx-2 d-flex flex-column gap-3">
        <PostCreateToggle user={myUser} />
        <PostList posts={posts} />
      </div>
    </div>
  );
}

export default PostContainer;
