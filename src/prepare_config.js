'use strict';
import { isDOMElement } from './utils';

let prepareConfig = function prepareConfig(input) {
  let config = {
    container: isDOMElement(input.container) ? input.container : undefined
  };

  if (!config.container) {
    throw 'Param `container` is mandarory';
  }

  return config;
};

export default prepareConfig;
