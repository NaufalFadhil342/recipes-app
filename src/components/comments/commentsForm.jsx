import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../utils/supabase";

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
  submitting,
  setSubmitting,
}) => {
  const { user } = useAuth();
  const handleCommentsSubmit = async (e) => {
    e.preventDefault();

    if (!addComment.trim()) return;
    setSubmitting(true);

    try {
      if (commentType === "reply" && replyTo) {
        const postReply = {
          user_id: user.id,
          text: addComment,
          comment_id: replyTo.id,
        };

        const { data: newReply, error: replyError } = await supabase
          .from("replies")
          .insert(postReply)
          .select(`*, users (author, avatar_url)`)
          .single();

        if (replyError) {
          console.error("Error input reply data:", replyError.message);
          return;
        }

        setComments(
          comments.map((comment) => {
            if (comment.id === replyTo.id) {
              return {
                ...comment,
                replies: [newReply, ...(comment.replies || [])],
              };
            }
            return comment;
          }),
        );

        setReplyTo(null);
      } else {
        const postComment = {
          user_id: user.id,
          text: addComment,
        };

        const { data: newComment, error: commentError } = await supabase
          .from("comments")
          .insert(postComment)
          .select(
            `*, users (author, avatar_url), replies (*, users (author, avatar_url))`,
          )
          .single();

        if (commentError) {
          console.error("Error input comment:", commentError.message);
          return;
        }

        setComments([newComment, ...comments]);
      }

      setAddComment("");
      setShowCommentField(false);
    } catch (error) {
      console.error("Failed to submit:", error.message);
    } finally {
      setSubmitting(false);
    }
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
          {submitting ? "Submitting..." : "Submit"}
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
