const Tags = ({ recipe }) => {
  return (
    <div className="w-full h-auto">
      <div className="w-full">
        <h4 className="text-xl text-inherit font-semibold mb-2">Tags</h4>
        <div className="w-full h-0.5 bg-stone-600/15" />
      </div>
      <ul className="w-full h-auto flex flex-wrap justify-start gap-3 mt-8">
        {recipe?.tags.map((tag, index) => (
          <li
            key={index}
            className="w-auto h-7 px-3 rounded-full bg-primary/10 border-2 border-primary flex items-center"
          >
            <p className="text-sm text-primary font-semibold capitalize">
              {tag}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tags;
