import {
  initCityData,
  addFormSubmitListener,
  addInputListener,
  addAutocompleteLinksEvents,
  addRemoveCitiesEvents,
  addClearCityListEventListener,
} from './logic';
import State from './state';
import watch from './watch';
import parserJson from './parserJson';

export default () => {
  const data = new State();
  watch(data);
  initCityData(data);
  addFormSubmitListener(data);
  addInputListener(data, parserJson());
  addAutocompleteLinksEvents(data);
  addRemoveCitiesEvents(data);
  addClearCityListEventListener(data);
};
