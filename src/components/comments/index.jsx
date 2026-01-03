import { Icon } from "@iconify/react";
import { useState } from "react";
import { dummyComment as comments } from "../../data/dummComment";

const expressions = [
  { name: "likes", icon: "iconamoon:like-bold", amount: 0 },
  { name: "dislikes", icon: "iconamoon:dislike-bold", amount: 0 },
];

const Comments = () => {
  const [showCommentField, setShowCommentField] = useState(false);

  const getRelativeTime = (minutes) => {
    if (minutes === 0) return "Just now";
    if (minutes < 1) return "few seconds ago";
    if (minutes === 1) return "1 min ago";
    if (minutes < 60) return `${minutes} mins ago`;

    const hours = Math.floor(minutes / 60);
    if (hours === 1) return "1 hour ago";
    if (hours < 24) return `${hours} hours ago`;

    const days = Math.floor(hours / 24);
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
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
            onClick={() => setShowCommentField(true)}
            aria-label="Show comment field"
          >
            <Icon icon="material-symbols:comment" className="size-5" />
            <>Add New</>
          </button>
        </div>
      </div>
      {showCommentField && (
        <div className="w-full h-auto mt-8">
          <textarea
            rows={4}
            className="w-full h-auto bg-white rounded-xl shadow-[0_3px_6px_rgba(41,37,36,0.06)] pt-3 pl-3 outline-none text-stone-600"
            placeholder="Add comments..."
            title="Add Comment"
          />
          <div className="w-full h-auto flex items-center justify-end gap-4 mt-4">
            <button
              type="submit"
              className="w-auto h-10 px-4 rounded-md bg-primary text-inherit font-medium hover:bg-dark hover:cursor-pointer transition-colors duration-150 ease-in-out"
              aria-label="Submit comment"
            >
              Submit
            </button>
            <button
              type="button"
              className="w-auto h-10 px-4 bg-transparent border border-stone-400 rounded-md text font-medium text-inherit hover:cursor-pointer"
              onClick={() => setShowCommentField(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <ul className="w-full h-auto mt-8 flex flex-col gap-6">
        {comments.map((comment, index) => {
          const minutesAgo = index * 2;

          return (
            <li key={comment.id} className="w-full h-auto">
              <div
                className="w-full h-auto flex flex-col gap-2
              "
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full border-2 border-stone-300 bg-linear-to-br from-primary to-yellow-400" />
                  <div className="w-full h-auto">
                    <div className="flex items-center gap-1">
                      <p className="text-semibold text-inherit">
                        {comment.user}
                      </p>
                      <span className="block text-stone-500 text-sm">
                        {getRelativeTime(minutesAgo)}
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
                        <Icon icon={exp.icon} className="text-stone-600" />
                        <span className="block">{exp.amount}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="text-sm text-stone-500 hover:cursor-pointer hover:text-primary"
                    aria-label="Reply comment"
                  >
                    Reply
                  </button>
                </div>
              </div>
              <div className="w-full h-auto mt-4 flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-medium text-inherit">Replies</p>
                    <span className="text-stone-500">
                      ({comment.replies.length})
                    </span>
                  </div>
                  <Icon
                    icon="tabler:chevron-down"
                    className="text-stone-500 size-5"
                  />
                </div>
                <div className="w-full h-auto pl-12">
                  <ul className="w-full h-auto">
                    {comment.replies.map((reply) => {
                      return (
                        <li
                          key={reply.id}
                          className="w-full h-auto flex flex-col gap-2"
                        >
                          <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full border-2 border-stone-300 bg-linear-to-br from-primary to-yellow-400" />
                            <div className="w-full h-auto">
                              <div className="flex items-center gap-1">
                                <p className="text-semibold text-inherit">
                                  {reply.user}
                                </p>
                                <span className="block text-stone-500 text-sm">
                                  {getRelativeTime(minutesAgo)}
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
                                <li
                                  key={index}
                                  className="flex items-center gap-1"
                                >
                                  <Icon
                                    icon={exp.icon}
                                    className="text-stone-600"
                                  />
                                  <span className="block">{exp.amount}</span>
                                </li>
                              ))}
                            </ul>
                            <button
                              type="button"
                              className="text-sm text-stone-500 hover:cursor-pointer hover:text-primary"
                              aria-label="Reply comment"
                            >
                              Reply
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Comments;
