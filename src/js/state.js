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
    this.cityData = new Map();
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
    const parseredObject = parser(res);
    const { name, country, weather } = parseredObject;

    this.addCityData({
      cityName: name,
      country,
      weather,
    });
  }

  addCityData(data) {
    this.cityData.set(this.uniqKey, data);
  }

  addCityName(name, country) {
    this.cityNames = [...this.cityNames, { name, country }];
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
