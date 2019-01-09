import removeChildren from './removeChildren';
import findMatches from './findMatches';

export default (namesList) => {
  const inputElement = document.querySelector('.cityName');
  const autocompleteTemplateElement = document.getElementById('autocomlete-template').content;
  const fragment = document.createDocumentFragment();

  inputElement.addEventListener('input', (e) => {
    const autocompleteListElement = document.querySelector('.autocomplete-list');

    /*
    ** Удаление старых подсказок автодополнения из autocomplete-list
    */
    removeChildren(autocompleteListElement);

    const currentValue = e.target.value.toLowerCase();

    if (currentValue !== '') {
      const matchesList = findMatches(namesList, currentValue);
      matchesList.forEach(({ name, country }) => {
        const node = autocompleteTemplateElement.cloneNode(true);
        const linkElement = node.querySelector('a');

        const spanElement = node.querySelector('span');
        linkElement.textContent = name;
        spanElement.textContent = country;
        fragment.appendChild(node);

        linkElement.addEventListener('click', (ev) => {
        /*
        ** Если пользователь выбрал один из городов из автодополнения
        ** то происходит подстановка значения в input и удаление элементов
        *** подсказки из autocomplete-list
        */
          ev.preventDefault();
          const autocompleteValue = ev.target.textContent;
          e.target.value = autocompleteValue;
          removeChildren(autocompleteListElement);
        });
      });
      autocompleteListElement.appendChild(fragment);
    }
  });
};
