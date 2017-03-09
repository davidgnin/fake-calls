'use strict';
import { generateHTML, generateID, isDOMElement } from './utils';
import queryUI from './query-ui/main';
import datetimepicker from './query-ui/datetimepicker/main';

let createGUI = function createGUI(config) {
  let id = generateID('fake-calls-');
  config.container.innerHTML = generateHTML(id);

  let gui = {};
  let selector = `#fake-calls-${id}`;
  gui.from = document.querySelector(`${selector} .fc-from`);
  gui.to = document.querySelector(`${selector} .fc-to`);
  gui.count = document.querySelector(`${selector} .fc-count`);
  gui.profile = document.querySelector(`${selector} .fc-profile`);
  gui.noise = document.querySelector(`${selector} .fc-noise`);
  gui.quiContainer = document.querySelector(`${selector} .fc-keys-container`);
  gui.make = document.querySelector(`${selector} .fc-make`);
  gui.download = document.querySelector(`${selector} .fc-download`);
  gui.remove = document.querySelector(`${selector} .fc-remove`);
  gui.errors = document.querySelector(`${selector} .fc-errors`);

  //Validation
  for (let key in gui) {
    if (gui.hasOwnProperty(key)) {
      if (!isDOMElement(gui[key])) {
        throw `GUI failed creating component: ${key}`;
      }
    }
  }

  config.fromPicker = datetimepicker({
    input: gui.from
  });
  config.toPicker = datetimepicker({
    input: gui.to
  });
  config.keysUI = queryUI({
    custom: 'string',
    container: gui.quiContainer,
    operators: ['=']
  });

  return gui;
};

export default createGUI;
