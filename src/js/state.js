import parser from './parser';

export default class State {
  constructor() {
    this.cityNameInputStatus = 'empty';
    this.autocompleteStatus = 'empty';
    this.cityDataStatus = 'empty';
    this.cityId = 0;
    /*
    ** формат cityData [
       {
        cityName: 'name',
        country: 'country',
        id,
        weather: {
          temperature: temp,
          description: description,
          icon: icon,
        },
      },
    ]
    */
    this.cityData = [];
    /*
    ** формат cityNames [
      {
        name: 'name',
        country: 'country',
      },
    ]
    */
    this.cityNames = [];
    /*
    ** формат autocompleteList [
      {
        name: 'name',
        country: 'country',
      },
    ]
    */
    this.autocompleteList = [];
    this.selectedAutocompleteLinkNumber = -1;
  }

  changeCityId() {
    this.cityId = this.cityId + 1;
    const id = this.cityId;
    return id;
  }

  addCity(res) {
    const parseredObject = parser(res);
    const { cityName, country } = parseredObject;
    const cityId = this.changeCityId();

    this.addCityData(cityId, parseredObject);
    this.addCityName({ cityName, country, id: cityId });
    this.cityDataStatus = 'not empty';
    this.recordCityDataToLocalStorage();
  }

  addCityData(id, data) {
    this.cityData = [...this.cityData, { ...data, id }];
  }

  addCityName(data) {
    this.cityNames = [...this.cityNames, data];
  }

  removeCity(number) {
    this.cityData = [...this.cityData.filter((item, index) => index !== number)];
    this.recordCityDataToLocalStorage();
    if (this.cityData.length === 0) {
      this.cityDataStatus = 'empty';
    }
  }

  removeCityList() {
    this.cityNames = [];
    this.cityData = [];
    this.cityId = 0;
    this.cityDataStatus = 'empty';
    this.recordCityDataToLocalStorage();
  }

  setAutocompleteList(list) {
    this.autocompleteList = list;
  }

  setCityNameInputStatus(value) {
    this.cityNameInputStatus = value;
  }

  setAutocompleteStatus(value) {
    this.autocompleteStatus = value;
  }

  setSelectedAutocompleteLinkNumber(value) {
    this.selectedAutocompleteLinkNumber = value;
  }

  getCityData() {
    return this.cityData;
  }

  getCityNames() {
    return this.cityNames;
  }

  getAutocompleteList() {
    return this.autocompleteList;
  }

  getCityNameInputStatus() {
    return this.cityNameInputStatus;
  }

  getAutocompleteStatus() {
    return this.autocompleteStatus;
  }

  cityNamesContains(city) {
    const result = this.cityData.filter(({ cityName }) => {
      const cityNameLowerCase = cityName.toLowerCase();
      return city.toLowerCase() === cityNameLowerCase;
    });
    return result.length > 0;
  }

  recordCityDataToLocalStorage() {
    const { localStorage } = window;
    if (localStorage) {
      const data = JSON.stringify(this.cityData);
      localStorage.setItem('cityData', data);
      localStorage.setItem('cityId', this.cityId);
    } else {
      /* eslint-disable */
      console.log('LocalStorage doesn\'t exists');
      /* eslint-enable */
    }
  }

  getCityDataFromLocalStorage() {
    const { localStorage } = window;
    if (localStorage.getItem('cityData')) {
      const data = JSON.parse(localStorage.getItem('cityData'));
      this.cityData = data;
      this.cityDataStatus = 'not empty';
      this.cityId = Number(localStorage.getItem('cityId'));
    }
  }

  changeCityDataOrder(currentId, previousId, nextId) {
    const currentElement = this.cityData.filter(({ id }) => id === currentId);
    const cityDataWithoutCurrentElement = [...this.cityData.filter(({ id }) => id !== currentId)];
    if (!previousId && nextId) {
      this.cityData = [...currentElement, ...cityDataWithoutCurrentElement];
    } else if (previousId && !nextId) {
      this.cityData = [...cityDataWithoutCurrentElement, ...currentElement];
    } else if (previousId && nextId) {
      let previousElementIndex;
      cityDataWithoutCurrentElement.forEach(({ id }, index) => {
        if (id === previousId) {
          previousElementIndex = index;
        }
      });
      const firstPartOfCityData = cityDataWithoutCurrentElement.slice(0, previousElementIndex + 1);
      const secondPartOfCityData = cityDataWithoutCurrentElement.slice(previousElementIndex + 1);
      this.cityData = [...firstPartOfCityData, ...currentElement, ...secondPartOfCityData];
    }
    this.recordCityDataToLocalStorage();
  }
}
