import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

function CommentContainer({ isCommentOpen, post }) {
  return (
    <div className="pb-2">
      <hr className="my-0 hr-sm" />
      <CommentList post={post} />
      <CommentForm isCommentOpen={isCommentOpen} post={post} />
    </div>
  );
}

export default CommentContainer;
