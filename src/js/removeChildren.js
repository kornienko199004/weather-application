export default (node) => {
  /*
    ** Удаление всех детей из node
    */
  if (node.hasChildNodes()) {
    const children = node.childNodes;
    for (let i = children.length - 1; i >= 0; i -= 1) {
      children[i].remove();
    }
  }
};
