export default (res) => {
  const { data } = res;
  const {
    name, weather, sys, main,
  } = data;
  const { country } = sys;
  const { icon } = weather[0];
  const description = weather[0].main;
  const { temp } = main;

  return {
    cityName: name,
    country,
    weather: {
      temperature: temp,
      description,
      icon,
    },
  };
};
