import _ from 'lodash';
import parser from './parser';

export default class State {
  constructor() {
    this.cityNameInput = 'empty';
    /*
    ** формат cityData {
      0: {
        cityName: 'name',
        country: 'country',
        weather: {
          temperature: temp,
          description: description,
          icon: icon,
        },
      },
    }
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
  }

  addCity(res) {
    console.log(res);
    const parseredObject = parser(res);
    const { cityName, country } = parseredObject;
    const cityId = _.uniqueId();

    this.addCityData(cityId, parseredObject);
    this.addCityName({ cityName, country, id: cityId });

    console.log('CityData');
    console.log(this.getCityData());
  }

  addCityData(id, data) {
    this.cityData = [...this.cityData, { ...data, id }];
  }

  addCityName(data) {
    this.cityNames = [...this.cityNames, data];
  }

  fillAutocompleteList(list) {
    this.autocompleteList = list;
  }

  getCityData() {
    return this.cityData;
  }

  getCityNames() {
    return this.cityNames;
  }
}
