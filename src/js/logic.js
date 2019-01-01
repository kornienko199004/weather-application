import requestToApi from './requestToApi';

const makeRequest = (state, cityName) => {
  requestToApi(cityName)
    .then((response) => {
      state.addCity(response);
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addFormSubmitListener = (state) => {
  const formElement = document.querySelector('form');

  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputValue = document.querySelector('.cityName').value;
    console.log(inputValue);
    makeRequest(state, inputValue);
  });
};

export const addInputListener = (state, cityList) => {
  const inputElement = document.querySelector('.cityName');
  inputElement.addEventListener('input', (e) => {
    const currentValue = e.target.value.toLowerCase();

    if (currentValue !== '') {
      state.setCityNameInputStatus('notempty');
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
      }
    } else if (currentValue === '') {
      state.setCityNameInputStatus('empty');
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
          state.setCityNameInputStatus('select');
          state.setSelectedAutocompleteLinkNumber(i);
        }
      }
    }
  });
};
