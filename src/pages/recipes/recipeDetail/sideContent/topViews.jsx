const TopViews = ({ recipes }) => {
  const sortByViews = [...recipes]
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  return (
    <div className="w-full h-auto">
      <div className="w-full h-auto">
        <h4 className="text-xl font-semibold text-inherit mb-2">Top Views</h4>
        <div className="w-full h-0.5 bg-stone-600/15" />
      </div>
      <ul className="w-full h-auto flex flex-col gap-6 mt-8">
        {sortByViews.map((view) => {
          const timeStampz = new Date(view.updated_at);
          const date = timeStampz.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });

          return (
            <li
              key={view.id}
              className="w-full h-auto flex items-stretch justify-start gap-3"
            >
              <div className="w-30 h-auto rounded-lg overflow-hidden">
                <img
                  className="w-full h-full object-cover object-center"
                  src={view.img_cover}
                  alt={view.alt_text}
                />
              </div>
              <div className="w-auto h-auto flex flex-col justify-center">
                <div className="text-sm text-stone-500 leading-none">
                  {date}
                </div>
                <p className="text-lg font-semibold text-inherit leading-none mt-2">
                  {view.title}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TopViews;
