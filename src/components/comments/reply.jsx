import { Icons } from "../../icons";
import { recipeIcons } from "../../data/recipeIconsData";

const Reply = ({
  reply,
  expressions,
  getRelativeTime,
  setShowCommentField,
  setCommentType,
  setReplyTo,
  commentId,
}) => {
  return (
    <li className="w-full h-auto flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className="w-11 h-10 rounded-full border-2 border-stone-300 bg-linear-to-br from-primary to-yellow-400" />
        <div className="w-full h-auto">
          <div className="flex items-center gap-2">
            <p className="text-semibold text-inherit">{reply.user}</p>
            {reply.replyTo && (
              <span className="flex items-center gap-1">
                <Icons
                  iconsName={recipeIcons.mageArrowDown}
                  className="text-stone-500"
                />
                <p className="text-stone-500">{reply.replyTo}</p>
              </span>
            )}
            <span className="block text-stone-500 text-sm">
              {getRelativeTime(reply.createdAt)}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full h-auto">
        <p className="text-stone-600">{reply.text}</p>
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
            setReplyTo({ id: commentId, name: reply.user });
            setShowCommentField(true);
          }}
        >
          Reply
        </button>
      </div>
    </li>
  );
};

export default Reply;
