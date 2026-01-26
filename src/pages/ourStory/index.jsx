import Story from "./story";
import Experiences from "./experiences";
import Purpose from "./purpose";
import Testimony from "../../components/testimony";
import ReachOutToUs from "../../layout/reachOutToUs";

const Stories = () => {
  return (
    <section className="w-full h-auto my-28 px-12 md:px-20">
      <div className="w-full h-auto">
        <Story />
      </div>
      <div className="w-full h-auto mt-20">
        <Experiences />
      </div>
      <div className="w-full h-auto mt-20">
        <Purpose />
      </div>
      <div className="w-full h-auto mt-20">
        <ReachOutToUs />
      </div>
      <div className="w-full h-auto mt-20">
        <Testimony />
      </div>
    </section>
  );
};

export default Stories;
