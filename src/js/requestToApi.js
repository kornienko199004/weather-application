import axios from 'axios';

const uri = 'http://api.openweathermap.org/data/2.5/weather';
const key = 'b7b7abcde1fc424883692dc63e18ed25';

export default city => axios.get(uri, {
  params: {
    q: city,
    APPID: key,
    units: 'metric',
  },
});
