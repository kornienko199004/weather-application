const removeChildren = (node) => {
  /*
    ** Удаление всех детей из node
    */
  if (node.hasChildNodes()) {
    const children = node.childNodes;
    for (let i = children.length - 1; i >= 0; i -= 1) {
      children[i].remove();
    }
  }
};

export const renderCityList = (data) => {
  const list = document.querySelector('.city-list');
  removeChildren(list);
  const cityListTemplateElement = document.getElementById('city-list-template').content;
  const fragment = document.createDocumentFragment();

  data.forEach(({ cityName, country, weather }) => {
    const node = cityListTemplateElement.cloneNode(true);
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
  const inputElement = document.querySelector('.cityName');
  const { name } = autocompleteList[number];
  inputElement.value = name;
};

export const blockForm = () => {
  const inputElement = document.querySelector('.cityName');
  const submitButton = document.getElementById('request-button');
  inputElement.disabled = true;
  submitButton.disabled = true;
};

export const unblockForm = () => {
  const inputElement = document.querySelector('.cityName');
  const submitButton = document.getElementById('request-button');
  inputElement.disabled = false;
  submitButton.disabled = false;
};

export const resetForm = () => {
  const inputElement = document.querySelector('.cityName');
  inputElement.value = '';
};

export const cityRepeatLook = () => {
  const inputElement = document.querySelector('.cityName');
  inputElement.classList.add('is-invalid');
  const eventCaption = document.getElementById('event-caption');
  eventCaption.classList.add('text-danger');
  eventCaption.classList.remove('text-muted');
  eventCaption.textContent = 'Input value already exists';
};

export const netErrorLook = () => {
  const inputElement = document.querySelector('.cityName');
  inputElement.classList.add('is-invalid');
  const eventCaption = document.getElementById('event-caption');
  eventCaption.classList.add('text-danger');
  eventCaption.classList.remove('text-muted');
  eventCaption.textContent = 'Net error or city doesn\'t exists';
};

export const usualLook = () => {
  const inputElement = document.querySelector('.cityName');
  inputElement.classList.remove('is-invalid');
  inputElement.classList.remove('is-valid');

  const eventCaption = document.getElementById('event-caption');
  eventCaption.classList.remove('text-danger');
  eventCaption.classList.remove('text-success');
  eventCaption.classList.add('text-muted');
  eventCaption.textContent = 'Input city name';
};

export const makeRequestLook = () => {
  const inputElement = document.querySelector('.cityName');
  inputElement.classList.add('is-valid');
  const eventCaption = document.getElementById('event-caption');
  eventCaption.classList.add('text-success');
  eventCaption.classList.remove('text-muted');
  eventCaption.textContent = 'Load';
};
