import profileImage from "../../assets/images/profile-image.png";

function Avatar({ src, size }) {
  return (
    <img
      src={src || profileImage}
      className="rounded-circle cursor-pointer"
      width={size || "60"}
      height={size || "60"}
      alt="user"
    />
  );
}

export default Avatar;
