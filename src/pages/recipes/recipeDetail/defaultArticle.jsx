import { Icon } from "@iconify/react";

const DefaultArticle = ({ article }) => {
  return (
    <article key={article.id} className="w-full h-auto flex flex-col gap-6">
      <p className="text-stone-600">{article.main}</p>
      <div className="w-full h-auto">
        <div className="flex items-center gap-2 -ml-1">
          <Icon
            icon="healthicons:vegetables"
            className="size-10 text-primary"
          />
          <h4 className="text-xl font-semibold text-inherit">Ingredients:</h4>
        </div>
        <ul className="list-disc list-inside mt-3">
          {article?.ingredients.map((ingredient, index) => (
            <li key={index} className="text-stone-600 mb-1">
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full h-auto">
        <div className="flex items-center gap-2 -ml-1">
          <Icon icon="icon-park-solid:cook" className="size-10 text-primary" />
          <h4 className="text-xl font-semibold text-inherit">How to Cook:</h4>
        </div>
        <ol className="mt-3">
          {article?.steps.map((step, index) => (
            <li
              key={index}
              className="text-stone-600 mb-1 grid grid-cols-[1rem_1fr] gap-2"
            >
              <span className="text-left font-semibold">{index + 1}.</span>
              <>{step}</>
            </li>
          ))}
        </ol>
      </div>
      <div className="w-full h-auto">
        <p className="text-stone-600">{article.end}</p>
      </div>
    </article>
  );
};

export default DefaultArticle;
