import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

function CommentContainer({ isCommentOpen, post, createComment, updateComment, deleteComment }) {
  return (
    <div className="pb-2">
      <hr className="my-0 hr-sm" />
      <CommentList post={post} updateComment={updateComment} deleteComment={deleteComment} />
      <CommentForm isCommentOpen={isCommentOpen} createComment={createComment} post={post} />
    </div>
  );
}

export default CommentContainer;
