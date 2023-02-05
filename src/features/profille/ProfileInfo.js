import Avatar from "../../components/ui/Avatar";
import AvatarGroup from "../../components/ui/AvatarGroup";
import ProfileEdit from "./ProfileEdit";

import { useDispatch, useSelector } from "react-redux";
import * as friendStatus from "../../config/constants";
import {
  thunk_deleteFriend,
  selectUser,
  selectStatusWithMe,
  selectFriends,
  thunk_addFriend,
  thunk_acceptFriend
} from "../../stores/features/users/userSlice";

function ProfileInfo() {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const statusWithMe = useSelector(selectStatusWithMe);
  const friends = useSelector(selectFriends);

  const isMe = statusWithMe === friendStatus.FRIEND_STATUS_ME;
  const isFriend = statusWithMe === friendStatus.FRIEND_STATUS_FRIEND;
  const isAccepter = statusWithMe === friendStatus.FRIEND_STATUS_ACCEPTER;
  const isRequester = statusWithMe === friendStatus.FRIEND_STATUS_REQUESTER;
  const isAnnonymous = statusWithMe === friendStatus.FRIEND_STATUS_ANNONYMOUS;

  const handleClickDelete = async () => {
    try {
      await dispatch(thunk_deleteFriend(user.id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleClickAdd = async () => {
    try {
      await dispatch(thunk_addFriend(user.id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleClickAccept = async () => {
    try {
      await dispatch(thunk_acceptFriend(user.id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const dataAvatarGroup = friends.map((item) => {
    return { ...item, to: "/profile/" + item.id };
  });

  return (
    <div className="d-flex flex-column flex-md-row align-items-center align-items-md-stretch mx-auto px-3 space-x-4 max-w-266">
      <div className="-mt-20 -mt-md-10 z-10">
        <Avatar src={user.profileImage} size="168" borderSize="4" borderColor="white" />
      </div>

      <div className="my-3 flex-grow-1 d-flex flex-column align-items-center d-md-block">
        <h2 className="fw-bold mb-0">{`${user.firstName || ""} ${user.lastName || ""}`}</h2>
        <span className="d-inline-block text-muted py-1">{`${friends.length} Friends`}</span>
        <AvatarGroup data={dataAvatarGroup} size="32" borderColor="white" borderSize="2" maxAvatar="5" />
      </div>

      <div className="mb-3 align-self-md-end">
        {isMe && <ProfileEdit />}
        {isFriend && (
          <button className="btn btn-secondary" onClick={handleClickDelete}>
            <i className="fa-solid fa-user-xmark" /> Unfriend
          </button>
        )}
        {isAnnonymous && (
          <button className="btn btn-primary" onClick={handleClickAdd}>
            <i className="fa-solid fa-user-plus" /> Add friend
          </button>
        )}
        {isRequester && (
          <button className="btn btn-danger" onClick={handleClickDelete}>
            <i className="fa-solid fa-user-xmark" /> Cancel Request
          </button>
        )}
        {isAccepter && (
          <>
            <button className="btn btn-primary" onClick={handleClickAccept}>
              <i className="fa-solid fa-user-check" /> Accept
            </button>
            <button className="btn btn-danger ms-2" onClick={handleClickDelete}>
              <i className="fa-solid fa-user-xmark" /> Reject
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileInfo;
