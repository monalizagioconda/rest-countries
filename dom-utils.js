const createFlagImgElement = country => {
  const imgContainerElement = document.createElement("div");
  const imgElement = document.createElement("img");
  imgElement.src = country.flagUrl;
  imgElement.alt = `${country.name} flag`;

  imgContainerElement.appendChild(imgElement);

  return imgContainerElement;
};

const createInfoElement = (labelName, value) => {
  const infoElement = document.createElement("div");
  const labelElement = document.createElement("strong");
  labelElement.innerText = `${labelName}: `;
  const valueElement = document.createElement("span");
  valueElement.innerText = value;

  infoElement.appendChild(labelElement);
  infoElement.appendChild(valueElement);

  return infoElement;
};

const createCountryItemElement = country => {
  const countryElement = document.createElement("li");

  const anchorElement = document.createElement("a");

  anchorElement.href = `?country=${country.code}`;

  anchorElement.appendChild(createFlagImgElement(country)); // appendujemy wywołaną funkcję, czyli dodajemy to co zwraca funkcja

  const infoContainerElement = document.createElement("div");
  infoContainerElement.classList.add("info-container");

  const countryNameElement = document.createElement("strong");
  countryNameElement.classList.add("country-name");
  countryNameElement.innerText = country.name;

  infoContainerElement.appendChild(countryNameElement);
  infoContainerElement.appendChild(createInfoElement("Population", country.population));
  infoContainerElement.appendChild(createInfoElement("Region", country.region));
  infoContainerElement.appendChild(createInfoElement("Capital", country.capital));

  anchorElement.appendChild(infoContainerElement);

  countryElement.appendChild(anchorElement);

  return countryElement;
};

const createListElement = countries => {
  const listElement = document.createElement("ul");
  countries.forEach(country => {
    listElement.appendChild(createCountryItemElement(country));
  });

  return listElement;
};

const createDetailElement = country => {
  const detailContainerElement = document.createElement("div");
  detailContainerElement.classList.add("detail-container");

  const flagImgElement = createFlagImgElement(country);

  const detailContentElement = document.createElement("div");

  const detailNameElement = document.createElement("h3");
  detailNameElement.innerHTML = country.name;
  detailNameElement.classList.add("detail-name");

  detailContainerElement.appendChild(flagImgElement);

  detailContentElement.appendChild(detailNameElement);

  const infoContentElement = document.createElement("div");
  infoContentElement.classList.add("info-content");

  infoContentElement.appendChild(createInfoElement("NativeName", country.nativeName));
  infoContentElement.appendChild(createInfoElement("Population", country.population));
  infoContentElement.appendChild(createInfoElement("Region", country.region));
  infoContentElement.appendChild(createInfoElement("Sub Region", country.subregion || "-"));
  infoContentElement.appendChild(createInfoElement("Capital", country.capital));
  infoContentElement.appendChild(createInfoElement("Top Level Domain", country.tld[0]));
  infoContentElement.appendChild(createInfoElement("Currencies", country.currencies));
  infoContentElement.appendChild(createInfoElement("Languages", country.languages));
  detailContentElement.appendChild(infoContentElement);

  detailContentElement.appendChild(createBorderCountriesContainer(country));

  detailContainerElement.appendChild(detailContentElement);

  return detailContainerElement;
};

const createDetailButton = (text, link) => {
  const anchorElement = document.createElement("a");
  anchorElement.className = 'shadow-button';
  anchorElement.innerText = text;
  anchorElement.href = link;

  return anchorElement;
};

const createBorderCountriesContainer = country => {
  const borderCountriesContainerElement = document.createElement("div");
  borderCountriesContainerElement.className = 'border-countries';
  const labelElement = document.createElement("strong");
  labelElement.innerText = "Border Countries:";

  borderCountriesContainerElement.appendChild(labelElement);

  (country.borders || []).forEach(border => {
    borderCountriesContainerElement.appendChild(createDetailButton(border, `/?country=${border}`));
  });

  return borderCountriesContainerElement;
};

// Poniżej funkcja, która działa jak 'wstecz'
// const goBack = (e) => {
//     e.preventDefault();
//     window.history.back();
// }

const createBackButtonElement = () => {
  const anchorElement = document.createElement("a");

  anchorElement.innerHTML = '<ion-icon name="arrow-back-outline"></ion-icon><span>Back</span>';
  anchorElement.className = "shadow-button detail-back-link";

  anchorElement.href = "/";

  // anchorElement.href = '#'
  // anchorElement.onclick = goBack

  return anchorElement;
};

export const renderCountriesList = countries => {
  const rootElement = document.querySelector("#root");
  rootElement.innerHTML = "";
  // dodanie z wywołaniem funkcji createListElement(countries) czyli dodanie to co zwraca funkcja
  rootElement.appendChild(createListElement(countries));
};

export const renderCountryDetails = country => {
  const rootElement = document.querySelector("#root");
  rootElement.innerHTML = "";
  rootElement.appendChild(createBackButtonElement());
  rootElement.appendChild(createDetailElement(country));
};
