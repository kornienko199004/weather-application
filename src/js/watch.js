import { watch } from 'melanke-watchjs';
import {
  renderCityList,
  renderAutocompleteList,
  removeAutocompleteNode,
  renderInputValue,
} from './view';

export default (data) => {
  console.log('watch');
  console.log(data);
  watch(data, 'cityData', () => {
    console.log('renderCityList');
    renderCityList(data.getCityData());
  });

  watch(data, 'autocompleteList', () => {
    console.log('autocompleteList');
    renderAutocompleteList(data.getAutocompleteList());
  });

  watch(data, 'selectedAutocompleteLinkNumber', () => {
    console.log('selectedAutocompleteLinkNumber');
    renderInputValue(data.selectedAutocompleteLinkNumber, data.getAutocompleteList());
  });

  watch(data, 'cityNameInputStatus', () => {
    console.log('cityNameInputStatus');
    if (data.getCityNameInputStatus() === 'empty' || data.getCityNameInputStatus() === 'select') {
      removeAutocompleteNode();
    }
  });
};
