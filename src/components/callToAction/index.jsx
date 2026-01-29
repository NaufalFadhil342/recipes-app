import { recipeIcons } from "../../data/recipeIconsData";
import { Icons } from "../../icons";

const usersRequest = [
  {
    name: "Email",
    text: "client@example.com",
    icon: recipeIcons.mdiEmail,
  },
  {
    name: "Phone",
    text: "(62) 812 3456 7890",
    icon: recipeIcons.solarPhone,
  },
  {
    name: "Address",
    text: "Jl. Surya Kencana, Bogor, West Java",
    icon: recipeIcons.tablerLocation,
  },
];

const CallToAction = () => {
  return (
    <ul className="w-full h-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {usersRequest.map((req, index) => (
        <li
          key={index}
          className="w-full h-auto p-6 rounded-xl bg-white shadow-[0_3px_6px_rgba(41,37,36,0.1)] flex gap-4"
        >
          <div className="rounded-xl border-2 border-stone-300 bg-inherit w-18 h-auto flex items-center justify-center">
            <Icons iconsName={req.icon} className="size-7 text-inherit" />
          </div>
          <div className="w-full h-auto space-y-1">
            <h3 className="text-xl font-semibold text-inherit">{req.name}</h3>
            <p className="text-stone-600 text-sm">{req.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CallToAction;
