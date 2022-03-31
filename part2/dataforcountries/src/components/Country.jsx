import { useState, useEffect } from "react";
import Weather from "./Weather";
import axios from "axios";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const languages = Object.values(country.languages);
  const api_key = process.env.REACT_APP_API_KEY;
  const lat = country.capitalInfo.latlng[0];
  const lng = country.capitalInfo.latlng[1];

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, []);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="flag" />
      <Weather weather={weather} />
    </div>
  );
};

export default Country;
