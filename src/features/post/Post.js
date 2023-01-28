import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";

function Post({ post, toggleLike, updatePost, deletePost, createComment, updateComment, deleteComment }) {
  return (
    <div className="border bg-white shadow-sm px-3 rounded-lg tw-pt-3">
      <PostHeader post={post} updatePost={updatePost} deletePost={deletePost} />
      <PostContent post={post} />
      <PostFooter
        post={post}
        toggleLike={toggleLike}
        createComment={createComment}
        updateComment={updateComment}
        deleteComment={deleteComment}
      />
    </div>
  );
}

export default Post;
