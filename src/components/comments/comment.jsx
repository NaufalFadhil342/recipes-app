import { useMemo } from "react";
import Reply from "./reply";
import { Icons } from "../../icons";

const Comment = ({
  comment,
  expressions,
  getRelativeTime,
  setShowCommentField,
  setCommentType,
  setReplyTo,
  showReplies,
  handleShowReplies,
}) => {
  const { directReplies, nestedReplies } = useMemo(() => {
    if (!comment.replies) return { directReplies: [], nestedReplies: [] };

    return {
      directReplies: comment.replies.filter(
        (reply) => !reply.replyTo || reply.replyTo === comment.user,
      ),
      nestedReplies: comment.replies.filter(
        (reply) => reply.replyTo && reply.replyTo !== comment.user,
      ),
    };
  }, [comment.replies, comment.user]);

  return (
    <li className="w-full h-auto">
      <div className="w-full h-auto flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="w-11 h-10 rounded-full border-2 border-stone-300 bg-linear-to-br from-primary to-yellow-400" />
          <div className="w-full h-auto">
            <div className="flex items-center gap-2">
              <p className="text-semibold text-inherit">{comment.user}</p>
              <span className="block text-stone-500 text-sm">
                {getRelativeTime(comment.createdAt)}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full h-auto">
          <p className="text-stone-600">{comment.text}</p>
        </div>
        <div className="w-full flex items-center gap-4">
          <ul className="flex items-center gap-4">
            {expressions.map((exp, index) => (
              <li key={index} className="flex items-center gap-1">
                <Icons iconsName={exp.icon} className="text-stone-600" />
                <span className="block">{exp.amount}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="text-sm text-stone-500 hover:cursor-pointer hover:text-primary"
            aria-label="Reply comment"
            onClick={() => {
              setCommentType("reply");
              setReplyTo({ id: comment.id, name: comment.user });
              setShowCommentField(true);
            }}
          >
            Reply
          </button>
        </div>
      </div>
      <div className="w-full h-auto mt-4 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="text-lg font-medium text-inherit hover:cursor-pointer"
            aria-label="Show replies"
            onClick={() => handleShowReplies(comment.id)}
          >
            Replies
          </button>
          <span className="text-stone-500">({comment.replies.length})</span>
        </div>
        {showReplies === comment.id && (
          <div className="w-full h-auto pl-10">
            {directReplies.length > 0 && (
              <ul className="w-full h-auto flex flex-col gap-4">
                {directReplies.map((reply) => {
                  return (
                    <Reply
                      expressions={expressions}
                      reply={reply}
                      key={reply.id}
                      getRelativeTime={getRelativeTime}
                      setShowCommentField={setShowCommentField}
                      setCommentType={setCommentType}
                      setReplyTo={setReplyTo}
                      commentId={comment.id}
                    />
                  );
                })}
              </ul>
            )}
            {nestedReplies.length > 0 && (
              <ul className="w-full h-auto flex flex-col gap-4 border-t border-stone-200 pt-4 mt-4">
                {nestedReplies.map((reply) => {
                  return (
                    <Reply
                      expressions={expressions}
                      reply={reply}
                      key={reply.id}
                      getRelativeTime={getRelativeTime}
                      setShowCommentField={setShowCommentField}
                      setCommentType={setCommentType}
                      setReplyTo={setReplyTo}
                      commentId={comment.id}
                    />
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    </li>
  );
};

export default Comment;
