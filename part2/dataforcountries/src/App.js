import axios from "axios";
import { useState, useEffect } from "react";
import Countries from "./components/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);

  const changeFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      find countries
      <input value={filter} onChange={changeFilter} />
      <Countries
        filter={filter}
        countries={countries}
      />
    </div>
  );
}

export default App;
