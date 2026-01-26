import React from "react";

const UsersForm = () => {
  return (
    <div className="w-full h-auto bg-white rounded-3xl p-6 shadow-[1.5px_1.5px_3px_rgba(41,37,36,0.08)]">
      <h3 className="text-[2em] font-bold text-inherit leading-none">
        Do You Need Help?
      </h3>
      <form className="w-full h-auto flex flex-col gap-6 mt-8">
        <div className="w-full h-auto">
          <label className="text-lg text-inherit font-medium" htmlFor="name">
            Your Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full h-auto py-2 pl-1.5 border border-gray-300 mt-3 outline-primary text-stone-600 rounded-md"
          />
        </div>
        <div className="w-full h-auto">
          <label className="text-lg text-inherit font-medium" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full h-auto py-2 pl-1.5 border border-gray-300 mt-3 outline-primary text-stone-600 rounded-md"
          />
        </div>
        <div className="w-full h-auto">
          <label className="text-lg text-inherit font-medium" htmlFor="phone">
            Phone
          </label>
          <input
            type="tel"
            placeholder="Enter phone number"
            className="w-full h-auto py-2 pl-1.5 border border-gray-300 mt-3 outline-primary text-stone-600 rounded-md"
          />
        </div>
        <div className="w-full h-auto">
          <label className="text-lg text-inherit font-medium" htmlFor="message">
            Message
          </label>
          <textarea
            rows={5}
            placeholder="Enter your message"
            className="w-full h-auto py-2 pl-1.5 border border-gray-300 mt-3 outline-primary text-stone-600 rounded-md"
          />
        </div>
        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-4">
          <div className="flex items-center gap-1.75">
            <input
              type="checkbox"
              className="size-3.5 accent-primary hover:cursor-pointer"
            />
            <label className="text-sm text-stone-600">
              I agree with
              <a className="text-primary font-medium ml-0.75">
                Terms of Use
              </a>{" "}
              and
              <a className="text-primary font-medium ml-0.75">Privacy Policy</a>
            </label>
          </div>
          <button
            type="submit"
            className="w-auto xs:w-fit h-auto py-2 px-4 rounded-md bg-primary text-stone-600 font-medium hover:cursor-pointer hover:bg-stone-800 hover:text-white transition-all duration-150 ease-in-out"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default UsersForm;
