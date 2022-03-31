import Country from "./Country";
import { useState } from "react";

const Countries = ({ filter, countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  const selectCountry = (country) => {
    setSelectedCountry(country);
  };

  if (selectedCountry != null) {
    return <Country country={selectedCountry} />;
  }
  return (
    <div>
      {filteredCountries.length > 10 ? (
        <div>Too many results</div>
      ) : filteredCountries.length !== 1 ? (
        filteredCountries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => selectCountry(country)}>show</button>
          </div>
        ))
      ) : (
        <Country country={filteredCountries[0]} />
      )}
    </div>
  );
};

export default Countries;
