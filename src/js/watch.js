import { watch } from 'melanke-watchjs';
import { renderCityList } from './view';

export default (data) => {
  console.log('watch');
  console.log(data);
  watch(data, 'cityData', () => {
    console.log('renderCityList');
    renderCityList(data.getCityData());
  });
};
