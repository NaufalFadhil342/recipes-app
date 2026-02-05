import { useAuth } from "../../hooks/useAuth";
import Auth from "../../pages/auth";
import { servicesItem } from "../../data/servicesItem";

const Service = () => {
  const { handleAuthOpen, setIsAuthOpen, isAuthOpen, isAuthenticated } =
    useAuth();

  return (
    <section className="w-full h-auto my-28 px-12 md:px-20 relative">
      <div className="w-full h-auto flex flex-col justify-center items-center text-center gap-2">
        <span className="italic text-primary font-medium">Services</span>
        <h2 className="text-4xl uppercase font-semibold -translate-y-0.5">
          What We Serves?
        </h2>
        <div className="w-14 h-0.75 bg-primary" />
      </div>
      <ul className="w-full h-auto grid md:grid-cols-3 gap-10 mt-20">
        {servicesItem.map((item, index) => {
          return (
            <li
              key={item.id}
              className="w-full h-auto overflow-hidden flex flex-col md:even:flex-col-reverse"
            >
              <div className="w-full h-72 rounded-3xl overflow-hidden">
                <img
                  className="w-full h-full object-cover object-center"
                  src={item.img_url}
                  alt={item.text}
                />
              </div>
              <div className="w-full h-auto py-10">
                <span className="text-xl font-medium text-primary">
                  0{index + 1}
                </span>
                <h3 className="text-3xl font-semibold text-inherit my-2 leading-none">
                  {item.text}
                </h3>
                <p className="text-stone-600">{item.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
      {isAuthenticated ? null : (
        <div className="w-full h-auto mt-10 flex justify-center">
          <button
            type="button"
            className="w-fit h-12 px-4 rounded-md font-medium text-inherit bg-primary hover:bg-dark hover:cursor-pointer transition-all duration-150 ease-in-out"
            onClick={handleAuthOpen}
          >
            Create Account
          </button>
          <Auth isAuthOpen={isAuthOpen} setIsAuthOpen={setIsAuthOpen} />
        </div>
      )}
    </section>
  );
};

export default Service;
