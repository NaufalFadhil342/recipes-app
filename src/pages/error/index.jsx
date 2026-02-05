import { Link } from "react-router";

const Error = () => {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center gap-8">
      <div className="text-[10em] font-bold text-stone-300 leading-none">
        404
      </div>
      <h1 className="text-4xl font-bold text-inherit leading-none">
        Page Not Found
      </h1>
      <Link
        to="/"
        className="w-auto h-12 px-6 rounded-lg bg-stone-300 text-inherit font-medium flex items-center hover:bg-[#c2bebb]"
      >
        Back to Home
      </Link>
    </section>
  );
};

export default Error;
