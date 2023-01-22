import Avatar from "./Avatar";
import { Link } from "react-router-dom";

function AvatarGroup({ data = [], size = 0, borderColor, borderSize, maxAvatar = 8 }) {
  return (
    <div>
      {data.slice(0, maxAvatar).map((item, index) => {
        return (
          <Link key={item.id} to={item.to}>
            <span className={index ? "-ms-2" : ""}>
              <Avatar src={item.profileImage} size={size} borderColor={borderColor} borderSize={borderSize} />
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export default AvatarGroup;
