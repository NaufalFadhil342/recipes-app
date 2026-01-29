import { Icons } from "../../../../icons";

const ShareIt = ({ shareArticle }) => {
  return (
    <div className="w-full h-auto flex items-center justify-end gap-3">
      <p className="text-stone-600">Share:</p>
      <ul className="w-auto h-auto flex gap-2">
        {shareArticle.map((share, index) => {
          const shareItem = share.icon === "share";

          return (
            <li key={index}>
              <a href="" className="underline-none" target="_blank">
                <Icons
                  iconsName={share.icon}
                  className={`size-5 ${shareItem ? "text-stone-500" : ""}`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ShareIt;
