import cityList from './json/data.json';

export default () => {
  const list = JSON.stringify(cityList);
  return JSON.parse(list);
};
