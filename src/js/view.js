import requestToApi from './requestToApi';

export default () => {
  const button = document.getElementById('request-button');

  button.addEventListener('click', (e) => {
    e.preventDefault();
    const inputValue = document.querySelector('.cityName').value;
    console.log(inputValue);
    requestToApi(inputValue)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
