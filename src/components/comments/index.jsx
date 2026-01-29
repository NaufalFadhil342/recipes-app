import { useState } from "react";
import { dummyComments } from "../../data/dummComment";
import Comment from "./comment";
import CommentsForm from "./commentsForm";
import { recipeIcons } from "../../data/recipeIconsData";
import { Icons } from "../../icons";

const expressions = [
  { name: "likes", icon: recipeIcons.moonLike, amount: 0 },
  { name: "dislikes", icon: recipeIcons.moonDislike, amount: 0 },
];

const Comments = () => {
  const [showCommentField, setShowCommentField] = useState(false);
  const [commentType, setCommentType] = useState("comment");
  const [replyTo, setReplyTo] = useState(null);
  const [showReplies, setShowReplies] = useState(null);
  const [addComment, setAddComment] = useState("");
  const [comments, setComments] = useState(dummyComments);

  const getRelativeTime = (commentDate) => {
    const now = new Date();
    const past = new Date(commentDate);
    const diffMs = now - past;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 10) return "Just now";
    if (seconds < 60) return "few seconds ago";
    if (minutes === 1) return "1 min ago";
    if (minutes < 60) return `${minutes} mins ago`;
    if (hours === 1) return "1 hour ago";
    if (hours < 24) return `${hours} hours ago`;
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
  };

  const handleShowReplies = (active) => {
    setShowReplies((prev) => (prev === active ? null : active));
  };

  if (!comments)
    return (
      <p className="text-center mx-auto text-stone-500 font-semibold text-xl">
        The content didn't have a comment yet. Try adding first!
      </p>
    );

  return (
    <section className="w-full h-auto">
      <div className="w-full h-auto flex items-center justify-between">
        <div className="w-full h-auto flex items-center gap-2 text-2xl">
          <h3 className="text-inherit font-semibold">Comments</h3>
          <span className="text-inherit font-semibold">
            ({comments.length})
          </span>
        </div>
        <div className="w-full h-auto flex justify-end">
          <button
            type="button"
            className="w-auto h-10 px-4 flex items-center gap-2 rounded-md bg-transparent border border-stone-600 text-stone-600 hover:border-primary hover:text-primary transition-all duration-150 ease-in-out hover:cursor-pointer"
            onClick={() => {
              setCommentType("comment");
              setReplyTo(null);
              setShowCommentField(true);
            }}
            aria-label="Show comment field"
          >
            <Icons iconsName={recipeIcons.mysComment} className="size-5" />
            <p className="hidden xs:block">Add New</p>
          </button>
        </div>
      </div>
      {showCommentField && (
        <CommentsForm
          setShowCommentField={setShowCommentField}
          placeholder={
            commentType === "reply"
              ? `Reply to ${replyTo.name}`
              : "Add comment..."
          }
          title={
            commentType === "reply" ? `Reply to ${replyTo.name}` : "Add comment"
          }
          addComment={addComment}
          setAddComment={setAddComment}
          replyTo={replyTo}
          setReplyTo={setReplyTo}
          commentType={commentType}
          comments={comments}
          setComments={setComments}
        />
      )}
      <ul className="w-full h-auto mt-6 flex flex-col gap-6">
        {comments.map((comment) => {
          return (
            <Comment
              comment={comment}
              expressions={expressions}
              key={comment.id}
              getRelativeTime={getRelativeTime}
              setShowCommentField={setShowCommentField}
              setCommentType={setCommentType}
              setReplyTo={setReplyTo}
              handleShowReplies={handleShowReplies}
              showReplies={showReplies}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Comments;
