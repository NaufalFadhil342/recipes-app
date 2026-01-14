import { useEffect, useState, useMemo } from "react";

const Countries = ({ tempFilters, setTempFilters }) => {
  const [countries, setCountries] = useState([]);
  const [limitCountries, setLimitCountries] = useState(5);

  useEffect(() => {
    const fetchCountries = () => {
      fetch("countries.json")
        .then((res) => res.json())
        .then((data) => {
          setCountries(data.countries);
        })
        .catch((error) => console.error("Error fetching data:", error));
    };

    fetchCountries();
  }, []);

  const handleShowAll = () => {
    setLimitCountries((prev) => (prev === 5 ? countries.length : 5));
  };

  const handleChangeCountry = (country) => {
    setTempFilters((prev) => {
      const crrCountries = prev.countries || [];
      const lowerCountry = country.toLowerCase();

      if (crrCountries.includes(lowerCountry)) {
        return {
          ...prev,
          countries: crrCountries.filter((cot) => cot !== lowerCountry),
        };
      } else {
        return {
          ...prev,
          countries: [...crrCountries, lowerCountry],
        };
      }
    });
  };

  const selectCountry = tempFilters.countries || [];

  const pieceCountries = useMemo(() => {
    return [...countries]
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, limitCountries);
  }, [countries, limitCountries]);

  return (
    <section className="w-full h-auto px-4">
      <div className="font-medium text-inherit pb-2.5 border-b border-stone-500/20">
        Countries
      </div>
      <ul className="mt-2 flex flex-col gap-1.5">
        {pieceCountries.map((country, index) => {
          const lowerCountry = country.name.toLowerCase();

          return (
            <li key={index} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="size-3.5 accent-primary hover:cursor-pointer"
                checked={selectCountry.includes(lowerCountry)}
                onChange={() => handleChangeCountry(country.name)}
              />
              <p>{country.name}</p>
            </li>
          );
        })}
      </ul>
      {countries.length > 5 && (
        <button
          type="button"
          className="text-inherit cursor-pointer font-medium mt-2 hover:text-primary ease-in-out transition-colors duration-150 text-sm"
          onClick={handleShowAll}
        >
          {limitCountries === 5 ? "Show all" : "Show less"}
        </button>
      )}
    </section>
  );
};

export default Countries;
