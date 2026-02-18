const Accordion = ({
  title,
  children,
  isAccordionActive,
  index,
  accordionActive,
}) => {
  return (
    <div className="w-full h-auto">
      <div className="w-full h-auto flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold text-inherit">{title}</h3>
        <button
          type="button"
          className="size-8 rounded border border-gray-400 flex items-center justify-center hover:cursor-pointer"
          onClick={() => accordionActive(index)}
        >
          {isAccordionActive === index ? "-" : "+"}
        </button>
      </div>
      {isAccordionActive === index && (
        <div className="w-auto h-auto mt-8">{children}</div>
      )}
    </div>
  );
};

export default Accordion;
