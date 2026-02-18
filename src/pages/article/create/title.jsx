const Title = ({ title, altText, onChange }) => {
  return (
    <div className="w-full h-auto p-6 px-8 pb-8 rounded-xl bg-white flex flex-col gap-6">
      <input
        type="text"
        className="w-full h-auto text-4xl font-bold pb-2 outline-none leading-none placeholder:text-stone-400/70 text-stone-600 border-b-2 border-stone-600/15"
        placeholder="Recipe title"
        name="title"
        value={title}
        onChange={onChange}
      />
      <input
        type="text"
        className="w-full h-auto outline-none"
        placeholder="Alternative text (ex. rendang)"
        name="alt_text"
        value={altText}
        onChange={onChange}
      />
    </div>
  );
};

export default Title;
