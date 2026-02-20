import Reply from "./reply";
import { Icons } from "../../icons";
import { formatDistanceToNow } from "date-fns";

const Comment = ({
  comment,
  expressions,
  setShowCommentField,
  setCommentType,
  setReplyTo,
  showReplies,
  handleShowReplies,
}) => {
  return (
    <li className="w-full h-auto">
      <div className="w-full h-auto flex flex-col gap-2">
        <div className="flex items-center gap-3">
          {comment.users?.avatar_url ? (
            <div className="w-11 h-10 rounded-full border-2 border-dark overflow-hidden">
              <img
                className="w-full h-auto object-cover object-center"
                src={comment.users?.avatar_url}
                alt={comment.users?.author}
                loading="lazy"
                referrerPolicy="no-referrer"
                width={500}
                height={500}
              />
            </div>
          ) : (
            <div className="w-11 h-10 rounded-full border-2 border-stone-300 bg-linear-to-br from-primary to-yellow-400" />
          )}
          <div className="w-full h-auto">
            <div className="flex items-center gap-2">
              <p className="text-semibold text-inherit">
                {comment.users?.author}
              </p>
              <span className="block text-stone-500 text-sm">
                {formatDistanceToNow(new Date(comment.created_at), {
                  addSuffix: true,
                })}
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
              setReplyTo({ id: comment.id, name: comment.users?.author });
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
          <span className="text-stone-500">
            ({comment.replies.length || 0})
          </span>
        </div>
        {showReplies === comment.id && (
          <ul className="w-full h-auto flex flex-col gap-4">
            {comment.replies?.map((reply) => {
              return (
                <Reply
                  expressions={expressions}
                  reply={reply}
                  key={reply.id}
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
    </li>
  );
};

export default Comment;
