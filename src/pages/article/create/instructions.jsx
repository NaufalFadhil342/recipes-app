const Instructions = ({
  instructions,
  setCreateArticle,
  handleInstruction,
}) => {
  return (
    <div className="w-auto h-auto">
      <h3 className="text-xl text-inherit font-medium leading-none">
        Instructions
      </h3>
      {instructions.map((instruction, index) => (
        <div key={index} className="flex items-center gap-3 mt-5">
          <input
            type="text"
            className="w-full border-b border-gray-400 py-2 pl-2 outline-none focus:border-primary"
            placeholder="Enter instruction"
            value={instruction}
            onChange={(e) => {
              const updatedInstructions = [...instructions];
              updatedInstructions[index] = e.target.value;
              setCreateArticle((prev) => ({
                ...prev,
                instructions: updatedInstructions,
              }));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleInstruction();
              }
            }}
          />
          {instruction.trim() && (
            <button
              type="button"
              onClick={() => {
                const updatedInstructions = instructions.filter(
                  (_, i) => i !== index,
                );
                setCreateArticle((prev) => ({
                  ...prev,
                  instructions: updatedInstructions,
                }));
              }}
              className="size-8 rounded-md border border-gray-400 flex items-center justify-center text-stone-600"
            >
              -
            </button>
          )}
        </div>
      ))}
      <div className="w-full h-auto flex justify-end">
        <button
          type="button"
          className="size-8 rounded-md mt-5 border border-gray-400 flex items-center justify-center text-stone-600"
          onClick={handleInstruction}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Instructions;
