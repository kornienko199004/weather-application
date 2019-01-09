export default (list, value) => list.filter(({ name }) => {
  const nameLowerCase = name.toLowerCase();
  return nameLowerCase.indexOf(value) === 0 && nameLowerCase !== value;
});
