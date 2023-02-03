import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { thunk_getUserPost, selectUserPost } from "../../stores/features/posts/postSlice";
import { selectMe } from "../../stores/features/auth/usersSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

function PostList() {
  const dispatch = useDispatch();
  const user = useSelector(selectMe);
  const posts = useSelector(selectUserPost);
  const { id: userId } = user;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        await dispatch(thunk_getUserPost(userId));
      } catch (err) {
        console.log(err.message);
        toast.error(err.message);
      } finally {
      }
    };
    fetchPost();
  }, []);

  return (
    <div className="d-flex flex-column gap-3">
      {posts.map((item) => {
        return <Post key={item.id} post={item} />;
      })}
    </div>
  );
}

export default PostList;
