import DropdownToggle from "./DropdownToggle";
import DropdownMenu from "./DropdownMenu";
function ProfileIcon() {
  return (
    <div className="d-flex justify-content-end flex-1">
      <div className="dropdown">
        <DropdownToggle />
        <DropdownMenu />
      </div>
    </div>
  );
}

export default ProfileIcon;
