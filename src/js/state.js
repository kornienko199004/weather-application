import _ from 'lodash';
import parser from './parser';

export default class State {
  constructor() {
    this.cityNameInputStatus = 'empty';
    this.autocompleteStatus = 'empty';
    /*
    ** формат cityData [
      0: {
        cityName: 'name',
        country: 'country',
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

  addCity(res) {
    const parseredObject = parser(res);
    const { cityName, country } = parseredObject;
    const cityId = _.uniqueId();

    this.addCityData(cityId, parseredObject);
    this.addCityName({ cityName, country, id: cityId });
  }

  addCityData(id, data) {
    this.cityData = [...this.cityData, { ...data, id }];
  }

  addCityName(data) {
    this.cityNames = [...this.cityNames, data];
  }

  removeCity(number) {
    let idRemoveCity;
    this.cityNames = [...this.cityNames.filter((item, index) => {
      if (index === number) {
        idRemoveCity = item.id;
      }
      return index !== number;
    })];
    this.cityData = [...this.cityData.filter(({ id }) => idRemoveCity !== id)];
  }

  removeCityList() {
    this.cityNames = [];
    this.cityData = [];
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
    const result = this.cityNames.filter(({ cityName }) => {
      const cityNameLowerCase = cityName.toLowerCase();
      return city.toLowerCase() === cityNameLowerCase;
    });
    return result.length > 0;
  }
}
