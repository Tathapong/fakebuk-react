import profileImage from "../../assets/images/profile-image.png";

function Avatar({ src, size, borderSize, borderColor }) {
  return (
    <img
      src={src || profileImage}
      className={`rounded-circle cursor-pointer ${borderSize ? "border border-" + borderSize : ""} ${
        borderColor ? "border-" + borderColor : ""
      }`}
      style={{ objectFit: "cover" }}
      width={size || "60"}
      height={size || "60"}
      alt="user"
    />
  );
}

export default Avatar;
