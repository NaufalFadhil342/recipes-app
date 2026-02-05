import { useState } from "react";
import { recipeIcons } from "../../../data/recipeIconsData";
import { Icons } from "../../../icons";
import countriesData from "../../../../countries.json";

const Country = ({
  isCountryOpen,
  createArticle,
  getSelectedCountryName,
  setIsCountryOpen,
  handleCountrySelect,
  countryRef,
}) => {
  const [getCountries] = useState(countriesData.countries);

  const sortCountries = [...getCountries].sort((a, b) =>
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
          } ${!createArticle.country ? "text-stone-300" : "text-stone-600"}`}
          onClick={() => setIsCountryOpen(!isCountryOpen)}
        >
          <span className="font-medium">
            {getSelectedCountryName(getCountries)}
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
                  className={`w-full py-2 px-4 text-left hover:bg-primary/15 text-inherit font-medium transition-colors flex items-center justify-between
                          ${
                            createArticle.country === country.name
                              ? "bg-primary/20"
                              : "bg-transparent"
                          }
                        `}
                  onClick={() => handleCountrySelect(country.name)}
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
