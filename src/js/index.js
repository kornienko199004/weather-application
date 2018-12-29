import { addFormSubmitListener, addInputListener } from './logic';
import State from './state';
import watch from './watch';
import parserJson from './parserJson';

export default () => {
  const data = new State();
  watch(data);
  addFormSubmitListener(data);
  addInputListener(data, parserJson());
};
