import { useMemo, useRef } from "react";
import { useReqForm } from "../../../hooks/useReqForm";

const UsersForm = () => {
  const phoneDialRef = useRef();
  const {
    countries,
    usersState,
    showDialCode,
    selectDialCode,
    errors,
    isSubmitted,
    handleReqChange,
    handleReqSubmit,
    setSelectDialCode,
    setShowDialCode,
  } = useReqForm(phoneDialRef);

  const sortCountries = useMemo(() => {
    return [...countries].sort((a, b) => a.name.localeCompare(b.name));
  }, [countries]);

  const dialCodes = (
    <ul className="w-full h-auto max-h-50 overflow-y-auto scrollbar-thin absolute top-full left-0 mt-2 z-10 p-2 bg-white rounded-xl shadow-[0_1.5px_3px_rgba(41,37,36,0.25)]">
      {sortCountries.map((country, index) => {
        return (
          <li
            key={index}
            className="w-auto h-auto flex items-center gap-4 my-1 py-1 hover:cursor-pointer"
            onClick={() => {
              setSelectDialCode(country.dial_code);
              setShowDialCode(false);
            }}
          >
            <div className="text-inherit font-medium">{country.dial_code}</div>
            <p className="text-stone-600">{country.name}</p>
          </li>
        );
      })}
    </ul>
  );

  const phoneNumberField = (
    <>
      <label className="text-lg text-inherit font-medium" htmlFor="phoneNumber">
        Phone
      </label>
      <div
        className="w-auto h-auto flex border border-gray-300 rounded-md relative"
        ref={phoneDialRef}
      >
        <div className="w-auto h-auto">
          <div
            className="w-10 h-full flex items-center justify-center hover:cursor-pointer"
            onClick={() => setShowDialCode(!showDialCode)}
          >
            {selectDialCode}
          </div>
          {showDialCode && dialCodes}
        </div>
        <input
          type="tel"
          placeholder="Enter phone number"
          className="w-full h-auto py-2 pl-1.5 outline-none text-stone-600"
          id="phoneNumber"
          name="phoneNumber"
          value={usersState.phoneNumber}
          onChange={handleReqChange}
        />
      </div>
      {errors.phoneNumber && (
        <p className="text-red-500 text-[15px] mt-1">{errors.phoneNumber}</p>
      )}
    </>
  );

  return (
    <div className="w-full h-auto bg-white rounded-3xl p-6 shadow-[1.5px_1.5px_3px_rgba(41,37,36,0.08)]">
      <h3 className="text-[2em] font-bold text-inherit leading-none">
        Do You Need Help?
      </h3>
      <form
        className="w-full h-auto flex flex-col gap-6 mt-8"
        onSubmit={handleReqSubmit}
      >
        <div className="w-full h-auto">
          <label
            className="text-lg text-inherit font-medium"
            htmlFor="username"
          >
            Your Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full h-auto py-2 pl-1.5 border border-gray-300 mt-3 outline-primary text-stone-600 rounded-md"
            id="username"
            name="username"
            value={usersState.username}
            onChange={handleReqChange}
          />
          {errors.username && (
            <p className="text-red-500 text-[15px] mt-1">{errors.username}</p>
          )}
        </div>
        <div className="w-full h-auto">
          <label className="text-lg text-inherit font-medium" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full h-auto py-2 pl-1.5 border border-gray-300 mt-3 outline-primary text-stone-600 rounded-md"
            id="email"
            name="email"
            value={usersState.email}
            onChange={handleReqChange}
          />
          {errors.email && (
            <p className="text-red-500 text-[15px] mt-1">{errors.email}</p>
          )}
        </div>
        <div className="w-full h-auto">
          <label className="text-lg text-inherit font-medium" htmlFor="message">
            Message
          </label>
          <textarea
            rows={5}
            placeholder="Enter your message"
            className="w-full h-auto py-2 pl-1.5 border border-gray-300 mt-3 outline-primary text-stone-600 rounded-md"
            id="message"
            name="message"
            value={usersState.message}
            onChange={handleReqChange}
          />
        </div>
        <div className="w-full h-auto">{phoneNumberField}</div>
        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-4">
          <div className="w-auto h-auto">
            <div className="flex items-center gap-1.75">
              <input
                type="checkbox"
                className="size-3.5 accent-primary hover:cursor-pointer"
                id="usersPermission"
                name="usersPermission"
                checked={usersState.usersPermission}
                onChange={handleReqChange}
              />
              <label
                className="text-sm text-stone-600"
                htmlFor="usersPermission"
              >
                I agree with
                <a className="text-primary font-medium ml-0.75">
                  Terms of Use
                </a>{" "}
                and
                <a className="text-primary font-medium ml-0.75">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.usersPermission && (
              <p className="text-sm text-red-500 mt-1">
                {errors.usersPermission}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-auto xs:w-fit h-auto py-2 px-4 rounded-md bg-primary text-stone-600 font-medium hover:cursor-pointer hover:bg-stone-800 hover:text-white transition-all duration-150 ease-in-out"
          >
            {isSubmitted ? "Send..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UsersForm;
