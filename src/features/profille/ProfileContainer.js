import ProfileCover from "../profille/ProfileCover";
import ProfileInfo from "./ProfileInfo";
import PostList from "../post/PostList";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as userService from "../../api/userApi";
import * as postService from "../../api/postApi";
import * as likeService from "../../api/likeApi";
import { toast } from "react-toastify";
import {
  FRIEND_STATUS_ACCEPTER,
  FRIEND_STATUS_ANNONYMOUS,
  FRIEND_STATUS_FRIEND,
  FRIEND_STATUS_ME,
  FRIEND_STATUS_REQUESTER
} from "../../config/constants";
import Spinner from "../../components/ui/Spinner";
import { selectMe } from "../../stores/features/auth/usersSlice";
import { useSelector, useDispatch } from "react-redux";
import { actions as loadingActions } from "../../stores/loadingSlice";

function ProfileContainer() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [user, setUser] = useState({});
  const [friends, setFriends] = useState([]);
  const [statusWithMe, setStatusWithMe] = useState("");
  const [posts, setPosts] = useState([]);
  const currentUser = useSelector(selectMe);

  useEffect(() => {
    const fetchUserFriends = async () => {
      try {
        dispatch(loadingActions.startLoading());
        const resFriends = await userService.getUserFriends(id);
        const resPosts = await postService.getUserPost("", id);
        setUser(resFriends.data.user);
        setFriends(resFriends.data.friends);
        setStatusWithMe(resFriends.data.statusWithMe);
        setPosts(resPosts.data.posts);
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data.message);
      } finally {
        dispatch(loadingActions.stopLoading());
      }
    };
    fetchUserFriends();
  }, [id, currentUser]);

  const changeStatusWithMe = (nextStatus) => setStatusWithMe(nextStatus);
  const deleteFriend = () => {
    const nextFriend = friends.filter((item) => item.id !== currentUser.id);
    setFriends(nextFriend);
  };

  const createFriend = () => {
    setFriends([...friends, currentUser]);
  };

  const updatePost = async (postId, input) => {
    const res = await postService.updatePost(postId, input);
    const newPosts = [...posts].map((item) => {
      if (item.id === postId) {
        item = res.data.post;
      }
      return item;
    });

    setPosts(newPosts);
  };

  const deletePost = async (postId) => {
    await postService.deletePost(postId);
    const newPosts = [...posts].filter((item) => item.id !== postId);
    setPosts(newPosts);
  };

  const toggleLike = async (postId) => {
    try {
      const res = await likeService.toggleLike(postId);
      const { like } = res.data;

      const newPosts = [...posts]; // ไม่ใช่ Deep clone (Object ที่อยู่ข้างใน ยังเป็น allowcated ของ post อยู่)
      const postIdx = newPosts.findIndex((item) => item.id === postId);

      if (like) newPosts[postIdx].Likes?.push(like);
      else newPosts[postIdx].Likes = newPosts[postIdx].Likes?.filter((item) => item.userId !== user.id);

      setPosts(newPosts);
    } catch (err) {
      console.log(err);
    }
  };

  if (!statusWithMe) return <Spinner />; // เพิ่มเข้าไปเอง เพื่อไม่ให้มันกระพริบเป็นค่าอื่น ก่อน Render

  return (
    <>
      <div className="shadow-sm pb-2" style={{ backgroundImage: "linear-gradient(#f0f2f5, #fff)" }}>
        <ProfileCover coverImage={user.coverImage} />
        <ProfileInfo
          isMe={statusWithMe === FRIEND_STATUS_ME}
          user={user}
          friends={friends}
          isFriend={statusWithMe === FRIEND_STATUS_FRIEND}
          isAnnonymous={statusWithMe === FRIEND_STATUS_ANNONYMOUS}
          isAccepter={statusWithMe === FRIEND_STATUS_ACCEPTER}
          isRequester={statusWithMe === FRIEND_STATUS_REQUESTER}
          changeStatusWithMe={changeStatusWithMe}
          deleteFriend={deleteFriend}
          createFriend={createFriend}
        />
      </div>
      <div className="mx-auto py-4 max-w-152">
        <div className="mx-2 d-flex flex-column gap-3">
          <PostList posts={posts} toggleLike={toggleLike} updatePost={updatePost} deletePost={deletePost} />
        </div>
      </div>
    </>
  );
}

export default ProfileContainer;
