function PostContent({ post }) {
  const { title, image } = post;
  return (
    <div className="tw-mt-3">
      <p className="text-3.5 mb-0">{title}</p>
      <div className="mt-3 -px-4">{image ? <img src={image} alt="post" className="img-fluid" /> : ""}</div>
    </div>
  );
}

export default PostContent;
