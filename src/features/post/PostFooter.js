import PostReaction from "./PostReaction";
import PostAction from "./PostAction";
import CommentContainer from "../comment/CommentContainer";
import { useState } from "react";

function PostFooter({ post, toggleLike, createComment, updateComment, deleteComment }) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  return (
    <>
      <PostReaction post={post} toggleComment={() => setIsCommentOpen((isCommentOpen) => !isCommentOpen)} />
      <hr className="hr-sm my-0" />
      <PostAction
        post={post}
        toggleLike={toggleLike}
        toggleComment={() => setIsCommentOpen((isCommentOpen) => !isCommentOpen)}
      />
      {isCommentOpen && (
        <CommentContainer
          post={post}
          isCommentOpen={isCommentOpen}
          createComment={createComment}
          updateComment={updateComment}
          deleteComment={deleteComment}
        />
      )}
    </>
  );
}
export default PostFooter;
