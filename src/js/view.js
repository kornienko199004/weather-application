import requestFunction from './requestToApi';

export default () => {
  const button = document.getElementById('request-button');

  button.addEventListener('click', requestFunction);
};
