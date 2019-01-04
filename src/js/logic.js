import requestToApi from './requestToApi';

export const initCityData = (state) => {
  state.getCityDataFromLocalStorage();
};

const makeRequest = (state, cityName) => {
  if (!state.cityNamesContains(cityName) && cityName !== '') {
    requestToApi(cityName)
      .then((response) => {
        state.setCityNameInputStatus('empty');
        state.addCity(response);
      })
      .catch((err) => {
        console.log(err);
        state.setCityNameInputStatus('net error');
      });
  } else if (state.cityNamesContains(cityName)) {
    state.setCityNameInputStatus('repeat');
  } else if (cityName === '') {
    state.setCityNameInputStatus('empty request');
  }
};

export const addFormSubmitListener = (state) => {
  const formElement = document.querySelector('form');

  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const cityName = document.querySelector('.cityName').value;
    state.setCityNameInputStatus('make request');
    makeRequest(state, cityName);
  });
};

export const addInputListener = (state, cityList) => {
  const inputElement = document.querySelector('.cityName');
  inputElement.addEventListener('input', (e) => {
    const currentValue = e.target.value.toLowerCase();

    if (currentValue !== '') {
      state.setAutocompleteStatus('not empty');
      state.setCityNameInputStatus('not empty');
      const matchesList = cityList.filter(({ name }) => {
        const nameLowerCase = name.toLowerCase();
        return nameLowerCase.indexOf(currentValue) === 0 && nameLowerCase !== currentValue;
      });

      if (matchesList.length > 0) {
        const autocompleteList = matchesList.reduce((acc, { name, country }) => {
          const cityElement = { name, country };
          return [...acc, cityElement];
        }, []);
        state.setAutocompleteList(autocompleteList);
      } else {
        state.setAutocompleteStatus('empty');
      }
    } else if (currentValue === '') {
      state.setCityNameInputStatus('empty');
      state.setAutocompleteStatus('empty');
    }
  });
};

export const addAutocompleteLinksEvents = (state) => {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('autocomlete__link')) {
      e.preventDefault();
      const ulElement = e.target.parentElement.parentElement;
      for (let i = 0; i <= ulElement.children.length; i += 1) {
        if (ulElement.children[i] === e.target.parentElement) {
          state.setAutocompleteStatus('select');
          state.setSelectedAutocompleteLinkNumber(i);
        }
      }
    }
  });
};

export const addRemoveCitiesEvents = (state) => {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('city__remove')) {
      e.preventDefault();
      const ulElement = e.target.parentElement.parentElement;
      for (let i = 0; i <= ulElement.children.length; i += 1) {
        if (ulElement.children[i] === e.target.parentElement) {
          state.removeCity(i);
        }
      }
    }
  });
};


export const addClearCityListEventListener = (state) => {
  const removeCityListButton = document.getElementById('remove-all-cities');
  removeCityListButton.addEventListener('click', () => {
    state.removeCityList();
  });
};

export const getCurrentCoordinates = () => {
  const geo = navigator.geolocation;
  console.log(geo);
  geo.getCurrentPosition((position) => {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
  });
};

export const addDragAndDropListener = (state, cityList) => {
  document.addEventListener('mousedown', (e) => {
    const element = e.target;
    let dragElement;
    if (element.classList.contains('list-group-item')) {
      dragElement = element;
    } else if (element.parentElement && element.parentElement.classList.contains('list-group-item')) {
      dragElement = element.parentElement;
    } else {
      console.log('Элемент не тянется');
    }
    console.log(dragElement);
    if (dragElement) {
      dragElement.style.position = 'absolute';
    }
  });
};
