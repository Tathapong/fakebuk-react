import PostCreateToggle from "./PostCreateToggle";
import PostList from "./PostList";

function PostContainer() {
  return (
    <div className="mx-auto py-4 max-w-152">
      <div className="mx-2 d-flex flex-column gap-3">
        <PostCreateToggle />
        <PostList />
      </div>
    </div>
  );
}

export default PostContainer;
