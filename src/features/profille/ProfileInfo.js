import Avatar from "../../components/ui/Avatar";
import AvatarGroup from "../../components/ui/AvatarGroup";
import ProfileEdit from "./ProfileEdit";

import { toast } from "react-toastify";
import * as friendService from "../../api/friendApi";
import { useLoading } from "../../contexts/LoadingContext";
import { FRIEND_STATUS_ANNONYMOUS, FRIEND_STATUS_FRIEND, FRIEND_STATUS_REQUESTER } from "../../config/constants";

function ProfileInfo({
  isMe,
  user,
  friends,
  isFriend,
  isAnnonymous,
  isAccepter,
  isRequester,
  changeStatusWithMe,
  deleteFriend,
  createFriend
}) {
  const { startLoading, stopLoading } = useLoading();

  const handleClickDelete = async () => {
    try {
      startLoading();
      await friendService.deleteFriend(user.id);
      changeStatusWithMe(FRIEND_STATUS_ANNONYMOUS);

      if (isFriend) deleteFriend();
      toast.success("success delete");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data.message);
    } finally {
      stopLoading();
    }
  };

  const handleClickAdd = async () => {
    try {
      startLoading();
      await friendService.addFriend(user.id);
      changeStatusWithMe(FRIEND_STATUS_REQUESTER);
      toast.success("success ad Friend");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data.message);
    } finally {
      stopLoading();
    }
  };

  const handleClickAccept = async () => {
    try {
      startLoading();
      await friendService.acceptFriend(user.id);
      changeStatusWithMe(FRIEND_STATUS_FRIEND);
      createFriend();
      toast.success("success accept friend");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data.message);
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row align-items-center align-items-md-stretch mx-auto px-3 space-x-4 max-w-266">
      <div className="-mt-20 -mt-md-10 z-10">
        <Avatar src={user.profileImage} size="168" borderSize="4" borderColor="white" />
      </div>

      <div className="my-3 flex-grow-1 d-flex flex-column align-items-center d-md-block">
        <h2 className="fw-bold mb-0">{`${user.firstName} ${user.lastName}`}</h2>
        <span className="d-inline-block text-muted py-1">{`${friends.length} Friends`}</span>
        <AvatarGroup
          data={friends.map((item) => {
            item.to = `/profile/${item.id}`;
            return item;
          })}
          size="32"
          borderColor="white"
          borderSize="2"
          maxAvatar="5"
        />
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
