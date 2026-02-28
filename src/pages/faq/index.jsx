import { useState } from "react";
import { DUMMY_FAQS } from "../../data/faqData";
import { AnimatePresence, motion } from "motion/react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleActiveIndex = (active) => {
    setActiveIndex(activeIndex === active ? null : active);
  };

  return (
    <section className="w-full h-auto my-28">
      <div className="w-full h-auto flex flex-col gap-4 items-center px-12 md:px-20">
        <div className="text-primary font-medium italic">FAQ</div>
        <h1 className="text-[2.5em] text-inherit font-bold text-center leading-none">
          Frequently Asked Question
        </h1>
        <p className="text-stone-600 text-center">
          Find quick answers to common questions about our App
        </p>
      </div>
      <ul className="w-full h-auto mt-20 flex flex-col items-center gap-8 xs:px-12 md:px-20">
        {DUMMY_FAQS.map((faq, index) => (
          <li
            key={index}
            className="p-8 rounded-3xl w-full max-w-3xl h-auto bg-primary/20 border-2 border-dark"
          >
            <div className="w-full flex items-start justify-between gap-8">
              <h3 className="text-2xl font-semibold capitalize text-inherit w-full md:max-w-md">
                {faq.title}
              </h3>
              <button
                type="button"
                className="text-4xl text-inherit hover:cursor-pointer"
                onClick={() => handleActiveIndex(index)}
              >
                {activeIndex === index ? "-" : "+"}
              </button>
            </div>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  className="overflow-hidden"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <p className="mt-6 w-full">{faq.text}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FAQ;
