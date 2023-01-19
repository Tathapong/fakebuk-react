import coverImage from "../../assets/images/cover-image.jpg";
function CoverImage({ src }) {
  return (
    <img
      src={src || coverImage}
      alt="cover"
      className="position-absolute  img-fluid top-50 start-50 translate-middle border"
    />
  );
}

export default CoverImage;
