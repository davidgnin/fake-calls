'use strict';
import { isDOMElement } from './utils';
import pubsub from './query-ui/pubsub';

let prepareConfig = function prepareConfig(input) {
  let config = {
    container: isDOMElement(input.container) ? input.container : undefined,
    ps: pubsub()
  };

  if (!config.container) {
    throw 'Param `container` is mandarory';
  }

  return config;
};

export default prepareConfig;
