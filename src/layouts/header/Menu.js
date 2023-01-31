import { useLocation } from "react-router-dom";

import { Friend, Home } from "../../components/icons";
import MenuItem from "./MenuItem";

function Menu() {
  const { pathname } = useLocation();
  const isHomePath = pathname === "/";
  const isFriendPath = pathname === "/friend";

  return (
    <div className="collapse navbar-collapse justify-content-center">
      <div className="navbar-nav space-x-1">
        <MenuItem to="/" active={isHomePath}>
          <Home className={isHomePath ? "fill-primary" : "fill-gray"} />
        </MenuItem>
        <MenuItem to="/friend" active={isFriendPath}>
          <Friend className={isFriendPath ? "fill-primary" : "fill-gray"} />
        </MenuItem>
      </div>
    </div>
  );
}

export default Menu;
