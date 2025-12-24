import { useCallback } from "react";

export const usePrevNextBtn = (emblaApi, onButtonClick) => {
  const onPrevBtnClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi, onButtonClick]);

  const onNextBtnClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi, onButtonClick]);

  return {
    onPrevBtnClick,
    onNextBtnClick,
  };
};

export const PrevButton = ({ className, onClick, children }) => {
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export const NextButton = ({ className, onClick, children }) => {
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
};
