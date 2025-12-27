import { Icon } from "@iconify/react";
import { Link } from "react-router";

const HeroItem = (props) => {
  return (
    <div
      className="flex-[0_0_100%] min-w-0 h-full bg-cover bg-center bg-no-repeat relative rounded-3xl overflow-hidden ml-8"
      style={{ backgroundImage: `url(${props.img_cover})` }}
      aria-label={props.alt_text}
    >
      <div className="w-full h-full flex flex-col items-center justify-between bg-stone-800/30">
        <div className="w-auto h-auto absolute -top-6">
          <div className="p-6 rounded-3xl bg-lime-50 relative">
            <h1 className="text-2xl md:text-4xl font-bold p-4 bg-primary rounded-2xl">
              {props.text}
            </h1>
            <div className="size-12 absolute top-0 -left-6.75 z-10 bg-radial-[at_0%_120%] from-transparent from-40% to-lime-50 to-43%" />
            <div className="size-12 absolute top-0 -right-6.75 z-10 bg-radial-[at_100%_120%] from-transparent from-40% to-lime-50 to-43%" />
          </div>
        </div>
        <Link
          to="/recipes"
          className="w-auto h-auto rounded-3xl bg-lime-50 p-6 absolute -bottom-6"
        >
          <span className="w-auto h-auto bg-stone-300 p-4 font-semibold md:text-xl rounded-2xl flex items-center gap-2 hover:bg-[#c2bebb] duration-150 transition-colors ease-in-out">
            <>View Recipe</>
            <Icon icon="uiw:d-arrow-right" className="size-5" />
          </span>
          <div className="size-10 absolute bottom-2.5 -left-6.25 bg-radial-[at_0%_5%] from-transparent from-43% to-lime-50 to-46%" />
          <div className="size-10 absolute bottom-2.5 -right-6.25 bg-radial-[at_100%_5%] from-transparent from-43% to-lime-50 to-46%" />
        </Link>
      </div>
    </div>
  );
};

export default HeroItem;
