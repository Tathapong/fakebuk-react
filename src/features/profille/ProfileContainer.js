import ProfileCover from "../profille/ProfileCover";
import ProfileInfo from "./ProfileInfo";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLoading } from "../../contexts/LoadingContext";
import * as userService from "../../api/userApi";
import { toast } from "react-toastify";
import {
  FRIEND_STATUS_ACCEPTER,
  FRIEND_STATUS_ANNONYMOUS,
  FRIEND_STATUS_FRIEND,
  FRIEND_STATUS_ME,
  FRIEND_STATUS_REQUESTER
} from "../../config/constants";
import Spinner from "../../components/ui/Spinner";
import { useAuth } from "../../contexts/AuthContext";

function ProfileContainer() {
  const { id } = useParams();
  const { startLoading, stopLoading } = useLoading();

  const [user, setUser] = useState({});
  const [friends, setFriends] = useState([]);
  const [statusWithMe, setStatusWithMe] = useState("");
  const { user: currentUser } = useAuth();

  useEffect(() => {
    const fetchUserFriends = async () => {
      try {
        startLoading();
        const res = await userService.getUserFriends(id);
        setUser(res.data.user);
        setFriends(res.data.friends);
        setStatusWithMe(res.data.statusWithMe);
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data.message);
      } finally {
        stopLoading();
      }
    };
    fetchUserFriends();
  }, [id, currentUser]);

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
        />
      </div>
    </>
  );
}

export default ProfileContainer;
