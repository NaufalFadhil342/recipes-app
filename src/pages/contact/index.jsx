import reqBG from "../../assets/request.webp";
import ReachOutToUs from "../../layout/reachOutToUs";
import UsersRequest from "./request/usersRequest";
import { BreadCrumb } from "../../layout/breadcrumb";

const ContactUs = () => {
  return (
    <section className="w-full h-auto my-28 px-12 md:px-20">
      <div
        className="w-full h-[75vh] rounded-3xl bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url(${reqBG})` }}
      >
        <div className="w-full h-full flex flex-col gap-4 items-center justify-center bg-stone-800/50 backdrop-blur px-12">
          <h1 className="text-5xl text-white font-bold leading-none text-center">
            Contact Us
          </h1>
          <BreadCrumb />
        </div>
      </div>
      <div className="w-full h-auto mt-20">
        <ReachOutToUs />
      </div>
      <div className="w-full h-auto mt-20">
        <UsersRequest />
      </div>
    </section>
  );
};

export default ContactUs;
