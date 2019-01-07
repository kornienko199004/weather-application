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
    if (e.target && e.target.classList.contains('autocomlete__link')) {
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

export const addDragAndDropListener = (state) => {
  let dragged;
  let previousId;

  const cityListElement = document.getElementById('city-list');

  document.addEventListener('mousedown', () => {
    Array.from(cityListElement.children).forEach((itemEl) => {
      itemEl.draggable = true;
    });
  });

  document.addEventListener('dragstart', (e) => {
    dragged = e.target;
    e.dataTransfer.setData('text', dragged);
    e.target.style.opacity = 0.5;
  });

  cityListElement.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const { target } = e;
    if (target && target !== dragged && target.nodeName === 'LI') {
      let movingElement;

      if (cityListElement.children[0] !== target) {
        movingElement = target.nextSibling;
      } else if (cityListElement.children[0] === target) {
        movingElement = target;
      }

      previousId = movingElement.dataset.id;
      cityListElement.insertBefore(dragged, movingElement);
    }
  });
  document.addEventListener('dragend', (e) => {
    e.preventDefault();
    const newCityListElement = document.getElementById('city-list');

    e.target.style.opacity = '';
    console.log(dragged.dataset.id);
    console.log(previousId);
  });
  document.addEventListener('drop', (e) => {
    e.preventDefault();
  });
};
