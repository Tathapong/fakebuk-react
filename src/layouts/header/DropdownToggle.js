import Avatar from "../../components/ui/Avatar";
import { useSelector } from "react-redux";
import { selectUser } from "../../stores/features/auth/userSlice";
function DropdownToggle({ onClick }) {
  const user = useSelector(selectUser);
  const { profileImage } = user;
  return (
    <div onClick={onClick}>
      <Avatar src={profileImage} size="40" />
    </div>
  );
}

export default DropdownToggle;
