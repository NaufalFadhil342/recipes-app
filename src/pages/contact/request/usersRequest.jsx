import UsersForm from "./usersForm";
import formBG from "../../../assets/request.webp";
import { Link } from "react-router";
import { Icon } from "@iconify/react";

const UsersRequest = () => {
  return (
    <section className="w-full h-auto flex flex-col lg:flex-row items-stretch gap-8">
      <div className="w-full h-auto flex-[0_0_50%]">
        <UsersForm />
      </div>
      <div className="w-full h-auto flex-[0_0_50%] flex flex-col gap-8">
        <div className="w-full flex-1 overflow-hidden rounded-3xl">
          <img
            className="w-full h-full object-cover object-[0]"
            src={formBG}
            alt="Users Form"
            width={768}
            height={768}
            loading="lazy"
          />
        </div>
        <div className="p-6 rounded-3xl bg-white shadow-[1.5px_1.5px_4px_rgba(41,37,36,0.08)] relative">
          <div className="text-stone-500 text-sm">
            Partnership & Collaborations
          </div>
          <p className="text-stone-800 font-medium mt-2">collabs@example.com</p>
          <Link
            className="group size-10 bg-primary text-stone-600 rounded-full flex items-center justify-center absolute right-6 top-1/2 -translate-y-1/2"
            onClick={() => scrollTo({ top: true })}
          >
            <Icon
              icon="ri:arrow-right-fill"
              className="size-6 rotate-90 group-hover:rotate-0 transition-all duration-150 ease-in-out"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UsersRequest;
