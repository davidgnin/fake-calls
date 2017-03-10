'use strict';
import prepareConfig from './prepare_config';
import createGUI from './create_gui';
import configErrors from './config_errors';
import generateCalls from './generate_calls';
import prepareCall from './prepare_call';
import manageCalls from './manage_calls';

let fakeCalls = function fakeCalls(input = {}) {
  let config = prepareConfig(input);
  config.gui = createGUI(config);

  configErrors(config);

  config.generateCalls = generateCalls;
  prepareCall(config);
  manageCalls(config);
};

export default fakeCalls;
