import { motion } from "motion/react";

const Loading = () => {
  return (
    <div className="w-40 h-0.75 bg-stone-200 relative">
      <motion.div
        className="w-14 h-full bg-primary absolute left-0"
        initial={{ left: 0 }}
        animate={{ left: "100%" }}
        transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
        whileInView={true}
      />
    </div>
  );
};

export default Loading;
