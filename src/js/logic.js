import requestToApi from './requestToApi';

const makeRequest = (state, cityName) => {
  requestToApi(cityName)
    .then((response) => {
      state.addCity(response);
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
      const matchesList = cityList.filter(({ name }) => {
        const nameLowerCase = name.toLowerCase();
        return nameLowerCase.indexOf(currentValue) === 0 && nameLowerCase !== currentValue;
      });

      const autocompleteList = matchesList.reduce((acc, { name, country }) => {
        const cityElement = { name, country };
        return [...acc, cityElement];
      }, []);
      state.fillAutocompleteList(autocompleteList);
    }
  });
};
