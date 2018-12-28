import path from 'path';

export default () => {
  const currentPath = path.resolve(__dirname, './dist/json');

  function readTextFile(file, callback) {
    const rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType('application/json');
    rawFile.open('GET', file, true);
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4 && rawFile.status == '200') {
        callback(rawFile.responseText);
      }
    };
    rawFile.send(null);
  }

  // usage:
  console.log(currentPath);
  console.log(__dirname);
  readTextFile(`${currentPath}/data.json`, (text) => {
    const data = JSON.parse(text);
    console.log(data);
  });
};
