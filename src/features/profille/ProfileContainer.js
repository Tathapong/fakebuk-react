import ProfileCover from "../profille/ProfileCover";
import ProfileInfo from "./ProfileInfo";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function ProfileContainer() {
  const params = useParams();
  const [profile, setProfile] = useState(null);

  return (
    <div className="shadow-sm pb-2" style={{ backgroundImage: "linear-gradient(#f0f2f5, #fff)" }}>
      <ProfileCover />
      <ProfileInfo />
    </div>
  );
}

export default ProfileContainer;
