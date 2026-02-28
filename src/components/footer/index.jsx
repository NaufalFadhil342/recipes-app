import { Link } from "react-router";
import { Icons } from "../../icons";
import { recipeIcons } from "../../data/recipeIconsData";

const addsLinks = [
  { name: "About", label: "about", path: "/about" },
  { name: "Recipes", label: "recipes", path: "/recipes" },
  { name: "Galleries", label: "galleries", path: "/galleries" },
  { name: "FAQ", label: "FAQ", path: "/faq" },
];

const securityServices = [
  { name: "Terms & Condition", link: "/terms" },
  { name: "Cookies", link: "/cookies" },
  { name: "Privacy Policy", link: "/policy" },
];

const contactInfo = [
  { name: "email", content: "ex@email.com" },
  { name: "phone", content: "(+62) 812 3456 7890" },
];

const Footer = () => {
  return (
    <footer className="w-full h-auto bg-white shadow-[0_-3px_7px_rgba(41,37,36,0.15)] flex flex-col">
      <div className="w-auto h-auto grid md:grid-cols-[1fr_2fr] gap-10 my-20 px-12 md:px-20 content-start">
        <div className="w-full h-auto">
          <h1 className="text-4xl font-bold leading-none">
            Recipe<span className="text-primary">App.</span>
          </h1>
          <p className="mt-4 text-stone-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad in nulla
            quae facilis dolorum minus.
          </p>
          <ul className="w-auto h-auto flex gap-6 mt-10">
            <li>
              <Icons
                iconsName={recipeIcons.lucideInstagram}
                className="size-10 text-stone-600/30 hover:text-stone-600"
              />
            </li>
            <li>
              <Icons
                iconsName={recipeIcons.codiTwitter}
                className="size-10 text-stone-600/30 hover:text-stone-600"
              />
            </li>
            <li>
              <Icons
                iconsName={recipeIcons.feFacebook}
                className="size-10 text-stone-600/30 hover:text-stone-600"
              />
            </li>
            <li>
              <Icons
                iconsName={recipeIcons.proTiktok}
                className="size-10 text-stone-600/30 hover:text-stone-600"
              />
            </li>
          </ul>
        </div>
        <div className="w-full h-auto flex flex-wrap sm:flex-nowrap items-start gap-10">
          <div className="w-auto sm:w-full h-auto">
            <span className="text-lg font-medium text-inherit">Menu</span>
            <ul className="w-full h-auto flex flex-col gap-2 mt-4">
              {addsLinks.map((link, index) => (
                <li key={index} className="w-auto h-auto">
                  <Link
                    to={link.path}
                    className="text-stone-600"
                    onClick={() => window.scrollTo({ top: true })}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-auto sm:w-full h-auto">
            <span className="text-lg font-medium text-inherit">Security</span>
            <ul className="w-full h-auto flex flex-col gap-2 mt-4">
              {securityServices.map((service, index) => (
                <li key={index} className="w-auto h-auto">
                  <a
                    href={service.link}
                    className="text-stone-600"
                    target="_blank"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-auto sm:w-full h-auto">
            <span className="text-lg font-medium text-inherit">Contact</span>
            <ul className="w-full h-auto flex flex-col gap-2 mt-4">
              {contactInfo.map((contact, index) => (
                <li key={index} className="w-auto h-auto text-inherit">
                  <p className="font-medium">{contact.name}:</p>
                  <a
                    href=""
                    className="text-stone-600 hover:text-primary text-sm"
                    target="_blank"
                  >
                    {contact.content}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-auto h-auto mb-10 px-12 md:px-20">
        <div className="w-full h-auto flex justify-center">
          <p className="text-stone-600 capitalize">
            © 2025 RecipeApp. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
