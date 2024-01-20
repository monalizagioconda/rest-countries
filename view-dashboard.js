import { renderCountriesList } from "./dom-utils.js";

export const renderDashboard = () => {
  const API_URL_ALL = "https://restcountries.com/v3.1/all";
  let countries;
  let region;
  let query;

  fetch(API_URL_ALL)
    .then((res) => res.json())
    .then((countriesRaw) => {
      // destructuring dla obiektu --> zamiast dowolnej nazwy argumentu w mapie (country); { png: flagsUrl } --> png jako flagsUrl
      countries = countriesRaw.map(
        ({
          capital,
          population,
          name: { common: name },
          cioc,
          cca2,
          ccn3,
          cca3,
          region,
          flags: { png: flagUrl },
        }) => {
          return {
            // połączenie destrukturingu z shorthand syntax dla obiektu -> capital: country.capital,
            //   capital: capital === undefined ? undefined : capital[0],
            // jeśli pierwszy składnik jest falsy to go zwrci taki, jaki jest, a jak jest truthy to przejdzie dalej i zastosuje drugi składnik
            capital: capital && capital[0],
            population: population.toLocaleString(), // property o nazwie population ma wartość wziętą ze zmiennej o nazwie population
            name,
            code: cioc || cca2 || cca3 || ccn3,
            region,
            flagUrl,
          };
        }
      );
      renderCountriesList(countries);
    });

  //przykład z destrukturingiem dla rozjaśnienia:
  // country = { population: 8000, name: 'Polska', ... }
  //   function ({ name, population }) {
  //     return {
  //         name,
  //         population: population.toLocaleString(),
  //     }
  //   }
  
  const filterDataAndRenderCountriesList = () => {
    const filteredCountries = countries.filter((country) => {
      return (
        // (query === undefined ? true : country.name.toLowerCase().includes(query)) &&
        (query === undefined || country.name.toLowerCase().includes(query)) &&
        (!region || country.region === region)
      );
    });
    renderCountriesList(filteredCountries);
  };

  document.querySelector("#query").addEventListener("input", (e) => {
    query = e.target.value.toLowerCase().trim();
    filterDataAndRenderCountriesList();
  });

  document.querySelector("#region").addEventListener("change", (e) => {
    region = e.target.value;
    filterDataAndRenderCountriesList();
  });
};
