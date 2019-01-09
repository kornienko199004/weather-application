import removeChildren from './removeChildren';

const inputElement = document.querySelector('.cityName');
const eventCaption = document.getElementById('event-caption');
const clearButton = document.getElementById('remove-all-cities');
const submitButton = document.getElementById('request-button');

export const renderCityList = (data) => {
  const list = document.querySelector('.city-list');
  removeChildren(list);
  const cityListTemplateElement = document.getElementById('city-list-template').content;
  const fragment = document.createDocumentFragment();

  data.forEach(({
    cityName,
    country,
    weather,
    id,
  }) => {
    const node = cityListTemplateElement.cloneNode(true);
    const item = node.querySelector('.city');
    item.dataset.id = id;
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

export const renderAutocompleteList = (autocompleteList) => {
  const autocompleteTemplateElement = document.getElementById('autocomlete-template').content;
  const fragment = document.createDocumentFragment();
  const autocompleteListElement = document.querySelector('.autocomplete-list');

  /*
  ** Удаление старых подсказок автодополнения из autocomplete-list
  */
  removeChildren(autocompleteListElement);

  autocompleteList.forEach(({ name, country }) => {
    const node = autocompleteTemplateElement.cloneNode(true);
    const linkElement = node.querySelector('a');

    const spanElement = node.querySelector('span');
    linkElement.textContent = name;
    spanElement.textContent = country;
    fragment.appendChild(node);
  });
  autocompleteListElement.appendChild(fragment);
};

export const removeAutocompleteNode = () => {
  const autocompleteListElement = document.querySelector('.autocomplete-list');
  removeChildren(autocompleteListElement);
};

export const renderInputValue = (number, autocompleteList) => {
  const { name } = autocompleteList[number];
  inputElement.value = name;
};

export const blockForm = () => {
  inputElement.disabled = true;
  submitButton.disabled = true;
};

export const unblockForm = () => {
  inputElement.disabled = false;
  submitButton.disabled = false;
};

export const resetForm = () => {
  inputElement.value = '';
};

const setFauilureLook = (message) => {
  inputElement.classList.add('is-invalid');
  eventCaption.classList.add('text-danger');
  eventCaption.classList.remove('text-muted');
  eventCaption.textContent = message;
};

const setUsualLook = (message) => {
  inputElement.classList.remove('is-invalid');
  inputElement.classList.remove('is-valid');
  eventCaption.classList.remove('text-danger');
  eventCaption.classList.remove('text-success');
  eventCaption.classList.add('text-muted');
  eventCaption.textContent = message;
};

export const cityRepeatLook = () => {
  setFauilureLook('Input value already exists');
};

export const netErrorLook = () => {
  setFauilureLook('Net error or city doesn\'t exists');
};

export const emptyRequestLook = () => {
  setFauilureLook('Input should be not empty');
};

export const usualLook = () => {
  setUsualLook('Input city name');
};

export const makeRequestLook = () => {
  inputElement.classList.add('is-valid');
  eventCaption.classList.add('text-success');
  eventCaption.classList.remove('text-muted');
  eventCaption.textContent = 'Load';
};

export const showClearButton = () => {
  clearButton.classList.remove('d-none');
};

export const hideClearButton = () => {
  clearButton.classList.add('d-none');
};
