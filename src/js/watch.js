import { watch } from 'melanke-watchjs';
import {
  renderCityList,
  renderAutocompleteList,
  removeAutocompleteNode,
  renderInputValue,
  unblockForm,
  blockForm,
  resetForm,
} from './view';

export default (data) => {
  watch(data, 'cityData', () => {
    renderCityList(data.getCityData());
  });

  watch(data, 'autocompleteList', () => {
    renderAutocompleteList(data.getAutocompleteList());
  });

  watch(data, 'autocompleteStatus', () => {
    console.log('autocompleteStatus');
    console.log(data.getAutocompleteStatus());
    if (data.getAutocompleteStatus() === 'select') {
      removeAutocompleteNode();
      renderInputValue(data.selectedAutocompleteLinkNumber, data.getAutocompleteList());
    } else if (data.getAutocompleteStatus() === 'empty') {
      removeAutocompleteNode();
    }
  });

  watch(data, 'cityNameInputStatus', () => {
    console.log(data.getCityNameInputStatus());
    switch (data.getCityNameInputStatus()) {
      case 'empty':
        resetForm();
        unblockForm();
        break;
      case 'make request':
        blockForm();
        break;
      case 'net error':
        unblockForm();
        break;
      case 'repeat':
        console.log(data.getCityNames());
        //blockForm();
        break;
      default:
        break;
    }
  });
};
