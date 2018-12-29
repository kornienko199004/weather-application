export const renderCityList = (data) => {
  const list = document.querySelector('.city-list');
  const autocompleteTemplateElement = document.getElementById('city-list-template').content;
  const fragment = document.createDocumentFragment();

  data.forEach(({ cityName, country, weather }) => {
    const node = autocompleteTemplateElement.cloneNode(true);
    const name = node.querySelector('.city__cityName');
    const cityCountry = node.querySelector('.city__country');
    const airTemperature = node.querySelector('.city__temperature');
    const weatherDescription = node.querySelector('.city__description');
    name.textContent = cityName;
    cityCountry.textContent = country;
    airTemperature.textContent = weather.temperature;
    weatherDescription.textContent = weather.description;
    fragment.appendChild(node);
  });

  list.appendChild(fragment);
};

export const renderAutocompleteList = (data) => {

};
