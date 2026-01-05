import { useAuth } from "../../hooks/useAuth";
import { v4 as uuidv4 } from "uuid";

const CommentsForm = ({
  setShowCommentField,
  placeholder,
  title,
  addComment,
  setAddComment,
  replyTo,
  setReplyTo,
  commentType,
  comments,
  setComments,
}) => {
  const { user } = useAuth();
  const handleCommentsSubmit = (e) => {
    e.preventDefault();

    if (!addComment.trim()) return;
    if (commentType === "reply" && replyTo) {
      const newReply = {
        id: uuidv4(),
        user: user?.user_metadata?.display_name,
        text: addComment,
        createdAt: new Date().toISOString(),
        replyTo: replyTo.name,
      };

      setComments(
        comments.map((comment) => {
          if (comment.id === replyTo.id) {
            return {
              ...comment,
              replies: [newReply, ...(comment.replies || [])],
            };
          }
          return comment;
        })
      );

      console.log("reply", newReply);
      setReplyTo(null);
    } else {
      const postComment = {
        id: uuidv4(),
        user: user?.user_metadata?.display_name,
        text: addComment,
        createdAt: new Date().toISOString(),
        replies: [],
      };

      console.log(commentType, postComment);
      setComments([postComment, ...comments]);
    }

    setAddComment("");
    setShowCommentField(false);
  };

  const canEnterComment = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCommentsSubmit(e);
    }
  };

  const handleCommentChange = (e) => {
    setAddComment(e.target.value);
  };

  return (
    <form
      method="POST"
      className="w-full h-auto mt-8 bg-white rounded-xl shadow-[0_3px_6px_rgba(41,37,36,0.06)]"
      onSubmit={handleCommentsSubmit}
    >
      <textarea
        rows={3}
        className="w-full h-auto pt-3 pl-3 outline-none text-stone-600"
        placeholder={placeholder}
        title={title}
        value={addComment}
        onChange={handleCommentChange}
        onKeyDown={canEnterComment}
      />
      <div className="w-full h-auto flex items-center justify-start xs:justify-end gap-4 px-3 pb-3 sm:px-6 sm:pb-6">
        <button
          type="submit"
          className="w-full xs:w-auto h-10 px-4 rounded-md bg-primary text-inherit font-medium hover:bg-dark hover:cursor-pointer transition-colors duration-150 ease-in-out"
          aria-label="Submit comment"
        >
          Submit
        </button>
        <button
          type="button"
          className="w-full xs:w-auto h-10 px-4 bg-transparent border border-stone-400 rounded-md text font-medium text-inherit hover:cursor-pointer"
          onClick={() => setShowCommentField(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CommentsForm;
