'use strict';
import prepareConfig from './prepare_config';
import createGUI from './create_gui';

let fakeCalls = function fakeCalls(input = {}) {
  let config = prepareConfig(input);
  config.gui = createGUI(config);
};

export default fakeCalls;
