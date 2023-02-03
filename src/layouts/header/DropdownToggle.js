import Avatar from "../../components/ui/Avatar";
import { useSelector } from "react-redux";
import { selectMe } from "../../stores/features/auth/usersSlice";
function DropdownToggle({ onClick }) {
  const user = useSelector(selectMe);
  const { profileImage } = user;
  return (
    <div onClick={onClick}>
      <Avatar src={profileImage} size="40" />
    </div>
  );
}

export default DropdownToggle;
