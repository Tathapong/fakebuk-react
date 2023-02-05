import PostReaction from "./PostReaction";
import PostAction from "./PostAction";
import CommentContainer from "../comment/CommentContainer";

import { useState } from "react";

function PostFooter({ post }) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const toggleComment = () => setIsCommentOpen((previous) => !previous);

  return (
    <>
      <PostReaction post={post} toggleComment={toggleComment} />
      <hr className="hr-sm my-0" />
      <PostAction post={post} toggleComment={toggleComment} />
      {isCommentOpen && <CommentContainer post={post} isCommentOpen={isCommentOpen} />}
    </>
  );
}
export default PostFooter;
