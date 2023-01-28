import Post from "./Post";

function PostList({ posts, toggleLike, updatePost, deletePost, createComment, updateComment, deleteComment }) {
  return (
    <div className="d-flex flex-column gap-3">
      {posts.map((item) => {
        return (
          <Post
            key={item.id}
            post={item}
            toggleLike={toggleLike}
            updatePost={updatePost}
            deletePost={deletePost}
            createComment={createComment}
            updateComment={updateComment}
            deleteComment={deleteComment}
          />
        );
      })}
    </div>
  );
}

export default PostList;
