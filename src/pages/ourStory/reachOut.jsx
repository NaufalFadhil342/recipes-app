import CallToAction from "../../components/callToAction";

const ReachOut = () => {
  return (
    <section className="w-full h-auto flex flex-col items-center gap-10">
      <h2 className="text-[2.5em] font-bold text-inherit leading-none text-center">
        Reach Out to Us Today
      </h2>
      <p className="text-stone-600 -mt-5 text-center">
        Whether you need to support or want to learn more, we're her to assist
        you
      </p>
      <div className="w-full h-auto">
        <CallToAction />
      </div>
    </section>
  );
};

export default ReachOut;
