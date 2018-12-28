import view from './view';
import autocomplete from './autocomplete';
import cityList from './json/data.json';

export default () => {
  view();
  const list = JSON.stringify(cityList);
  const cityListArray = JSON.parse(list);
  autocomplete(cityListArray);
};
