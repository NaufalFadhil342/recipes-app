import { useEffect, useState } from "react";
import { recipeIcons } from "../../../data/recipeIconsData";
import { Icons } from "../../../icons";
import { supabase } from "../../../utils/supabase";

const Country = ({
  isCountryOpen,
  createArticle,
  getSelectedCountryName,
  setIsCountryOpen,
  handleCountrySelect,
  countryRef,
}) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const { data, error } = await supabase.from("countries").select("*");

      if (error) {
        console.error("fetch countries error:", error);
      }

      setCountries(data);
    };

    fetchCountries();
  }, []);

  const sortCountries = [...countries].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return (
    <div className="w-full h-auto">
      <label className="font-medium">Country</label>
      <div className="w-full h-auto relative mt-2" ref={countryRef}>
        <button
          type="button"
          className={`w-full py-3 border-b-2 text-left flex items-center justify-between transition-all hover:cursor-pointer ${
            isCountryOpen
              ? "border-primary"
              : "border-stone-600/15 hover:border-primary"
          } ${!createArticle.country_code ? "text-stone-300" : "text-stone-600"}`}
          onClick={() => setIsCountryOpen(!isCountryOpen)}
        >
          <span className="font-medium">
            {getSelectedCountryName(countries)}
          </span>
          <Icons
            iconsName={recipeIcons.tablerChevDown}
            className={`size-5 text-stone-600 transition-transform duration-150 ease-in-out ${
              isCountryOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isCountryOpen && (
          <ul className="w-full h-auto max-h-50 absolute right-0 top-full bg mt-2 bg-white shadow-md rounded-md overflow-x-hidden overflow-auto scrollbar-thin">
            {sortCountries.map((country) => (
              <li key={country.code} className="w-full h-auto">
                <button
                  type="button"
                  className={`w-full py-2 px-4 text-left hover:bg-primary/15 font-medium transition-colors flex items-center justify-between
                          ${
                            createArticle.country_code === country.code
                              ? "bg-primary/20"
                              : "bg-transparent"
                          }
                        `}
                  onClick={() => handleCountrySelect(country.code)}
                >
                  {country.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Country;
