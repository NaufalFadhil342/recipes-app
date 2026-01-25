import Story from "./story";
import Experiences from "./experiences";
import Purpose from "./purpose";
import ReachOut from "./reachOut";
import Testimony from "../../components/testimony";

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
        <ReachOut />
      </div>
      <div className="w-full h-auto mt-20">
        <Testimony />
      </div>
    </section>
  );
};

export default Stories;
