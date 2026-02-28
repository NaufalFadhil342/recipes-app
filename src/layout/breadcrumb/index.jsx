import { useLocation, Link } from "react-router";

export const BreadCrumb = () => {
  const location = useLocation();

  const segments = location.pathname.split("/").filter(Boolean);

  const crumbs = [
    { label: "Home", href: "/" },
    ...segments.map((segment, index) => ({
      label:
        segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
      href: `/${segments.slice(0, index + 1).join("/")}`,
    })),
  ];

  return (
    <div className="flex items-center gap-2">
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        return (
          <div key={crumb.href} className="flex items-center gap-2">
            {index !== 0 && <div className="w-px h-4 bg-stone-200" />}
            <Link
              to={crumb.href}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={`font-medium duration-150 transition-all ease-in-out ${
                isLast
                  ? "text-white cursor-default pointer-events-none"
                  : "text-stone-200 hover:text-primary"
              }`}
            >
              {crumb.label}
            </Link>
          </div>
        );
      })}
    </div>
  );
};
